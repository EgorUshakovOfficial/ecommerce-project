from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Models
from ..models import CartItem

# Serializer
from ..serializers import CartItemSerializer

# Constants
from ..constants import COOKIE_NAME, COOKIE_NOT_FOUND

# Utilities
from utils.create_error import create_error

class CartItemListView(APIView):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.COOKIE_NAME = COOKIE_NAME
        self.COOKIE_ERROR_MESSAGE = COOKIE_NOT_FOUND
        self.MISSING_CART = create_error("Missing Field", "The cart field is required")
        self.BAD_REQUEST = create_error('Bad Request', 'The cart item data is invalid')

    # Handles PUT /api/shopping/cart
    # Args:
    #   self: Instance of the class
    #   request: Request object
    # Return
    #   Response object
    def put(self, request):
        # Retrieve the shopping session value from cookie
        shopping_session_id = request.COOKIES.get(self.COOKIE_NAME)

        # Shopping session Id cookie does not exist
        if shopping_session_id is None:
            return Response(self.COOKIE_NOT_FOUND, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve quantity and cart fields from the request object
        cart = request.data.get('cart')

        # Cart field is missing
        if cart is None:
            return Response(self.MISSING_CART, status=status.HTTP_400_BAD_REQUEST)

        # Memoize the cart Id number for each item in the cart
        cart_lookup = {cart_item['product']: True for cart_item in cart}

        # Retrieve existing cart items from the database
        cart_instance = CartItem.objects.filter(shopping_session=shopping_session_id)

        # Compare the items in the cart instance with those in the cart from the request object
        for cart_item in cart_instance:
            # Initialize cart item Id number
            id = str(cart_item.product.id)

            # If the cart item already exists in the database, ignore it
            if id in cart_lookup:
                cart_lookup[id] = False

        # Filters the cart for new items
        new_cart_items = [cart_item for cart_item in cart if cart_lookup[cart_item['product']]]

        # Alter each product in the cart to have shopping session Id number
        for product in new_cart_items:
            product['shopping_session'] = shopping_session_id

        # Validate data against the cart item serializer
        cart_serializer = CartItemSerializer(data=new_cart_items, many=True)

        # If data is invalid, raise a bad request error
        if cart_serializer.is_valid() == False:
            return Response(self.BAD_REQUEST, status=status.HTTP_400_BAD_REQUEST)

        # Save new cart items to the database
        cart_serializer.save()

        # Concatenated existing cart items in the database with the new ones
        cart_instance_serializer = CartItemSerializer(cart_instance, many=True)
        data = cart_instance_serializer.data + cart_serializer.data

        return Response({"cart":data}, status=status.HTTP_200_OK)

    # Things to do: Deprecate this endpoint
    # Handles POST /api/shopping/cart
    # Args:
    #   self: Instance of the class
    #   request: Request object
    # Return
    #   Response object
    def post(self, request):
        # Retrieve the shopping session value from cookie
        shopping_session_id = request.COOKIES.get(self.COOKIE_NAME)

        # Shopping session Id cookie does not exist
        if shopping_session_id is None:
            return Response(self.COOKIE_NOT_FOUND, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve cart field from the request object
        cart = request.data.get('cart')

        # Cart field is missing
        if cart is None:
            return Response(self.MISSING_CART, status=status.HTTP_400_BAD_REQUEST)

        # Associate each cart item with the shopping session Id number
        for cart_item in cart:
            cart_item['shopping_session'] = shopping_session_id

        # Validate the cart against the cart item serializer
        serializer = CartItemSerializer(data=cart, many=True)

        # If the cart item serializer invalidates data, raise a bad request error
        if serializer.is_valid() == False:
            return Response(self.BAD_REQUEST, status=status.HTTP_400_BAD_REQUEST)

        # Create new cart items and associate them with shopping session in the database
        serializer.save()

        return Response({"cart":serializer.data}, status=status.HTTP_200_OK)

    # Handles GET /api/shopping/cart
    # Args:
    #   self: Instance of the class
    #   request: Request object
    # Return
    #   Response object
    def get(self, request):
        # Retrieve the shopping session value from cookie
        shopping_session_id = request.COOKIES.get(self.COOKIE_NAME)

        # Shopping session Id cookie does not exist
        if shopping_session_id is None:
            return Response(self.COOKIE_NOT_FOUND, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve all cart items in the shopping session
        cart = CartItem.objects.filter(shopping_session=shopping_session_id)

        # Validate data against the cart serializer
        serializer = CartItemSerializer(cart, many=True)

        return Response({"cart":serializer.data}, status=status.HTTP_200_OK)

# View
cart_item_list_view = CartItemListView.as_view()