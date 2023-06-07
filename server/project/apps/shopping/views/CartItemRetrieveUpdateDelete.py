from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Models
from ..models import CartItem

# Serializers
from ..serializers import CartItemSerializer

# Constants
from ..constants import COOKIE_NAME, COOKIE_NOT_FOUND

# Utilities
from utils.create_error import create_error

# Cart Item Details
class CartItemRetrieveUpdateDelete(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.MISSING_QUANTITY = create_error("Missing Field", "The quantity field is required")
        self.MISSING_PRODUCT = create_error("Missing Field", "The product field is required")
        self.INVALID_CART_ITEM = create_error('Bad Request', 'The cart item data is invalid')
        self.INSTANCE_NOT_FOUND = create_error("Not Found", "The cart item not found in the database")
        self.COOKIE_NAME = COOKIE_NAME
        self.COOKIE_ERROR_MESSAGE = COOKIE_NOT_FOUND

    # Retrieves quantity and product from the request object
    # Args:
    #   request: Request object
    # Return
    #   quantity: The number of items added to the cart by the user
    #   product: Product Id number
    def get_required_fields(self, request):
        # Extract quantity and product from the request object
        quantity = request.data.get('quantity')
        product = request.data.get('product')

        return quantity, product

    # Handles PUT /api/shopping_sessions/cart/cart_items/:cart_item_id
    # Args:
    #   self: Instance of the class
    #   request: Request object
    # Return
    #   Response object
    def put(self, request, cart_item_id):
        # Retrieve the shopping session Id from cookie
        shopping_session_id = request.COOKIES.get(self.COOKIE_NAME)

        # If shopping session Id cookie does not exist, raise a cookie not error
        if shopping_session_id is None:
            return Response(self.COOKIE_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve quantity from the request object
        quantity, product = self.get_required_fields(request)

        # Quantity field does not exist
        if quantity is None:
            return Response(self.MISSING_QUANTITY, status=status.HTTP_400_BAD_REQUEST)

        # Product field does not exist
        if product is None:
            return Response(self.MISSING_PRODUCT, status=status.HTTP_400_BAD_REQUEST)

        # Initialize search filter
        search = {'id': cart_item_id, 'shopping_session':shopping_session_id}

        # Search for cart item using Id in the database
        cart_item = CartItem.get_cart_item(search)

        # Cart item does not exist in the database
        if cart_item is None:
            return Response(self.INSTANCE_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)

        # Initialize cart item data
        cart_item_data = {
            'quantity': quantity,
            'product':product,
            'shopping_session': shopping_session_id
        }

        # Validate cart item data against the cart item serializer
        serializer = CartItemSerializer(instance=cart_item, data=cart_item_data)

        # If cart item data is invalid, raise a bad request error
        if serializer.is_valid() == False:
            return Response(self.INVALID_CART_ITEM, status=status.HTTP_400_BAD_REQUEST)

        # Save the updated instace in the database
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    # Handles DELETE /api/shopping_sessions/cart/cart_items/:cart_item_id
    # Args:
    #   self: Instance of the class
    #   request: Request object
    # Return
    #   Response object
    def delete(self, request, cart_item_id):
        # Retrieve the shopping session Id from cookie
        shopping_session_id = request.COOKIES.get(self.COOKIE_NAME)

        # If shopping session Id cookie does not exist, raise a cookie not error
        if shopping_session_id is None:
            return Response(self.COOKIE_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)

        # Initialize search filter
        search = {'id': cart_item_id, 'shopping_session':shopping_session_id}

        # Search for cart item using Id in the database
        cart_item = CartItem.get_cart_item(search)

        # Delete cart item from the database
        if cart_item is not None:
            cart_item.delete()

        return Response()

    # Handles GET /api/shopping_sessions/cart/cart_items/:cart_item_id
    # Args:
    #   self: Instance of the class
    #   request: Request object
    # Return
    #   Response object
    def get(self, request, cart_item_id):
        # Retrieve the shopping session Id from cookie
        shopping_session_id = request.COOKIES.get(self.COOKIE_NAME)

        # If shopping session Id cookie does not exist, raise a cookie not error
        if shopping_session_id is None:
            return Response(self.COOKIE_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)

        # Initialize search filter
        search = {'id': cart_item_id, 'shopping_session':shopping_session_id}

        # Search for the cart item using the filter
        cart_item = CartItem.get_cart_item(search)

        # If cart item is not found, raise a not found error
        if cart_item is None:
            return Response(self.INSTANCE_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)

        # Serialize the cart item data
        serializer = CartItemSerializer(cart_item)

        return Response(serializer.data, status=status.HTTP_200_OK)

# View
cart_item_retrieve_update_delete = CartItemRetrieveUpdateDelete.as_view()