from stripe.error import CardError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Models
from apps.shopping.models import CartItem

# Serializers
from ..serializers import OrderSerializer, OrderItemSerializer

# Services
from apps.transactions.services.stripe.PaymentCard import PaymentCard

# Utilities
from utils.create_error import create_error
from ..utils import generate_order_number

# Order details
class OrderCreateView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.MISSING_USER = create_error('Missing field', 'The user field is required')
        self.MISSING_SUBTOTAL = create_error('Missing field', 'The subtotal field is required')
        self.MISSING_SHIPPING = create_error('Missing field', 'The shipping field is required')
        self.QUANTITY_EXCEEDED_STOCK = create_error('Quantity Exceeds Available Stock', 'One or more cart items is not available for purchase')

    # Retrieves card information from the request object
    # Args:
    #   request: Request object
    # Return:
    #   card_info: Card information dictionary that includes card number, cardholder, expiration date, and security code
    def get_card_info(self, request):
        # 16 card number
        card_number = request.data.get('cardNumber')

        # Name of the cardholder
        cardholder = request.data.get('cardholder')

        # Expiration date
        expiration_date = request.data.get('expirationDate')

        # CSV code
        security_code = request.data.get('securityCode')

        # Initialize card information dictionary
        card_info = {
            'card_number': card_number,
            'cardholder': cardholder,
            'expiration_date': expiration_date,
            'security_code': security_code
        }

        return card_info

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
        # Extract card data from the request object
        card_info = self.get_card_info(self, request)

        # Initialize user Id number, subtotal, and shipping cost
        user_id = request.data.get('user')
        subtotal = request.data.get('subtotal')
        shipping_cost = request.data.get('shipping_cost')

        # If the user does not exist, raise a missing field error
        if user_id is None:
            return Response(self.MISSING_USER, status=status.HTTP_400_BAD_REQUEST)

        # If the subtotal does not exist, raise a missing field error
        if subtotal is None:
            return Response(self.MISSING_SUBTOTAL, status=status.HTTP_400_BAD_REQUEST)

        # If shipping does not exist, raise a missing field error
        if shipping_cost is None:
            return Response(self.MISSING_SHIPPING, status=status.HTTP_400_BAD_REQUEST)

        # Initialize search filter
        search = {'user_id': user_id}

        cart = CartItem.objects.filter(search)

        # Check if each item in cart associated the user is avaiable for purchase
        all_items_available = self.validate_quantity_available(cart)

        # If at least one of the items in cart is not available for purchase, raise a bad request error
        if all_items_available == False:
            return Response(self.QUANTITY_EXCEEDED_STOCK, status=status.HTTP_400_BAD_REQUEST)

        # Attempt to charge card
        try:
            # Initialize payment card
            payment_card = PaymentCard(card_info)

            # Charges the specified payment card
            payment_card.charge(
                card=card_info,
                subtotal=subtotal,
                shipping_cost=shipping_cost
            )

            # Generate an order number after card has been charged
            order_number = generate_order_number()

            # # Order details data
            # order_details_data = {
            #     'total': total,
            #     'order_number':order_number,
            #     'user': user
            # }

        # Handles errors that pertain to the process of card payment
        except CardError as e:
            error = create_error(e.code, e.error.message)
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        # Handles other errors
        except Exception as e:
            # Initialize error object
            message = e.message if hasattr(e, 'message') else e
            error = create_error('Internal Server Error', message)

            return Response(error, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# View
order_create_view = OrderCreateView.as_view()