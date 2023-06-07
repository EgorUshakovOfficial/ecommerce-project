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

        # Retrieve quantity and cart fields from the request object
        cart = request.data.get('cart')

        # Cart field is missing
        if cart is None:
            return Response(self.MISSING_CART, status=status.HTTP_400_BAD_REQUEST)

        # Alter each product in the cart to have shopping session Id number
        for product in cart:
            product['shopping_session'] = shopping_session_id

        # Validate data against the cart item serializer
        serializer = CartItemSerializer(data=cart, many=True)

        # If data is invalid, raise a bad request error
        if serializer.is_valid() == False:
            print(serializer.errors)
            return Response(self.BAD_REQUEST, status=status.HTTP_400_BAD_REQUEST)

        # Save new cart items to the database
        serializer.save()

        return Response(status=status.HTTP_201_CREATED)

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