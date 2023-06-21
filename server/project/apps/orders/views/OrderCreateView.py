from django.db import transaction
from stripe.error import CardError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Models
from apps.shopping.models import CartItem, ShoppingSession
from apps.products.models import Product

# Serializers
from ..serializers import OrderSerializer, OrderItemSerializer

# Services
from apps.transactions.services.stripe.PaymentCard import PaymentCard

# Utilities
from utils.calculate_total import calculate_total
from utils.create_error import create_error
from ..utils import generate_order_number

# Order details
class OrderCreateView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.MISSING_COOKIE = create_error('Missing Cookie', 'The shopping session cookie is missing')
        self.MISSING_USER = create_error('Missing field', 'The user field is required')

    # Validate the quantity of each cart item associated with the user against the product's available stock
    # Args:
    #   cart: Cart associated with the user
    # Return
    #   True or False
    def validate_quantity_available(self, cart):
        # Iterate through the cart items
        for cart_item in cart:
            # If the cart item's quantity exceeds the available stock, raise a bad request error
            if cart_item.quantity > cart_item.product.quantity:
               return False
        return True

    # Handles POST /api/orders, creating a new order
    # Args
    #   request: Request object
    # Return
    #   response: Response object
    def post(self, request):
        # Retrieve the shopping session value from cookies
        shopping_session_id = request.COOKIES.get('shopping_session')

        # If cookie does not exist, raise a missing cookie error
        if shopping_session_id is None:
            return Response(self.MISSING_COOKIE, status=status.HTTP_400_BAD_REQUEST)

        # Extract user, personal, shipping method, card information, and subtotal fields from the request object
        personal_info = request.data.get('personal')
        shipping_method = request.data.get('shipping')
        card_info = request.data.get('payment')
        user_id = request.data.get('user')
        subtotal = request.data.get('subtotal')

        # If the personal information does not exist, raise a missing field error
        if personal_info is None:
            MISSING_PERSONAL_INFO = create_error('Missing Field', 'Personal information is required')
            return Response(MISSING_PERSONAL_INFO, status=status.HTTP_400_BAD_REQUEST)

        # If the shipping method does not exist, raise a missing field error
        if shipping_method is None:
            MISSING_SHIPPING_METHOD = create_error('Missing Field', 'Shipping is required')
            return Response(MISSING_SHIPPING_METHOD, status=status.HTTP_400_BAD_REQUEST)

        # If the payment information does not exist, raise a missing field error
        if card_info is None:
            MISSING_CARD_INFO = create_error('Missing Payment', 'Card information is required')
            return Response(MISSING_CARD_INFO, status=status.HTTP_400_BAD_REQUEST)

        # If the user does not exist, raise a missing field error
        if user_id is None:
            return Response(self.MISSING_USER, status=status.HTTP_400_BAD_REQUEST)

        # If subtotal does not exist, raise a missing field error
        if subtotal is None:
            MISSING_SUBTOTAL = create_error('Missing Field', 'The subtotal field is required')
            return Response(MISSING_SUBTOTAL, status=status.HTTP_400_BAD_REQUEST)

        # Find cart items in the database by the user Id number
        cart = CartItem.objects.filter(shopping_session=shopping_session_id)

        # Check if each item in cart associated the user is avaiable for purchase
        all_items_available = self.validate_quantity_available(cart)

        # If at least one of the items in cart is not available for purchase, raise a bad request error
        if all_items_available == False:
            QUANTITY_EXCEEDED_STOCK = create_error('Quantity Exceeds Available Stock', 'One or more cart items is not available for purchase')
            return Response(QUANTITY_EXCEEDED_STOCK, status=status.HTTP_400_BAD_REQUEST)

        # Attempt to charge card
        try:
            # Initialize payment card and shipping cost
            payment_card = PaymentCard(
                card_number=card_info.get('cardNumber'),
                cardholder=card_info.get('cardholder'),
                expiration_date=card_info.get('expirationDate'),
                security_code=card_info.get('securityCode')
            )
            shipping_cost = shipping_method.get('price')

            # Charges the specified payment card
            payment_card.charge(subtotal=subtotal, shipping_cost=shipping_cost)

            # Ensures atomicity
            with transaction.atomic():
                # Decrease the quantity of each product in the database by the purchased amount
                for cart_item in cart:
                    # Search product by its Id number
                    product = cart_item.product

                    # Calculate new quantity using the product
                    new_quantity = product.quantity-cart_item.quantity

                    # Update the quantity of the product using new quantity
                    Product.objects.filter(id=product.id).update(quantity=new_quantity)

                # Generate an order number after card has been charged
                order_number = generate_order_number()

                # Initialize total amount
                total = calculate_total(subtotal, shipping_cost)

                # Create new order in the database and save it
                order_data = {
                    'total':total,
                    'order_number':order_number,
                    'user': user_id
                }

                # Validate the data against the order serializer
                order_serializer = OrderSerializer(data=order_data)

                # If the order data is valid, create new order and save it to the database
                if order_serializer.is_valid():
                    order_serializer.save()

                # Create new order items in the database
                for cart_item in cart:
                    # Initialize order item data
                    order_item_data = {
                        'product': cart_item.product.id,
                        'quantity': cart_item.quantity,
                        'order_details': order_serializer.data.get('id')
                    }

                    # Validate each order item's data against the order item serializer
                    order_item_serializer = OrderItemSerializer(data=order_item_data)

                    # If data is valid, save it in the database
                    if order_item_serializer.is_valid():
                        order_item_serializer.save()

                # Deletes shopping session and cart items associated with it from the database
                shopping_session = ShoppingSession.get_shopping_session_by_id(shopping_session_id)
                if shopping_session is not None:
                    shopping_session.delete()

            return Response({"message":"User has been successfully charged"}, status=status.HTTP_201_CREATED)


        # Handles errors that pertain to the process of card payment
        except CardError as e:
            error = create_error(e.code, e.error.message)
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        # Handles other errors
        except Exception as e:
            # Initialize error object
            message = e.message if hasattr(e, 'message') else e
            error = create_error('Internal Server Error', message)

            return Response("Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# View
order_create_view = OrderCreateView.as_view()