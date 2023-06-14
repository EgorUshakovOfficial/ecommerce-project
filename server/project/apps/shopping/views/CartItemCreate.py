from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Serializers
from ..serializers import CartItemSerializer

# Utilities
from utils.create_error import create_error

# Constants
from ..constants import COOKIE_NAME, COOKIE_NOT_FOUND
MISSING_QUANTITY = create_error('Missing Field', 'The quantity field is required')
MISSING_PRODUCT = create_error('Missing Field', 'The product field is required')
INVALID_CART_ITEM = create_error('Bad Request', 'The cart item data is invalid')

# Handles /api/shopping_sessions/cart/cart_items
# Args:
#   self: Instance of the class
#   request: Request object
# Return
#   Response object
@api_view(['POST'])
def cart_item_create(request):
    # Retrieve shopping session Id from cookie
    shopping_session_id = request.COOKIES.get(COOKIE_NAME)

    # If shopping session Id does not exist, raise a missing cookie error
    if shopping_session_id is None:
        return Response(COOKIE_NOT_FOUND, status=status.HTTP_400_BAD_REQUEST)

    # Retrieve cart item's Id number, quantity, and product from the request object
    cart_item_id = request.data.get('id')
    quantity = request.data.get('quantity')
    product = request.data.get('product')

    # If quantity does not exist, raise a missing field error
    if quantity is None:
        return Response(MISSING_QUANTITY, status=status.HTTP_400_BAD_REQUEST)

    # If product does not exist, raise a missing field error
    if product is None:
        return Response(MISSING_PRODUCT, status=status.HTTP_400_BAD_REQUEST)

    # Initialize cart item data
    cart_item_data = {
        "id":cart_item_id,
        "quantity": quantity,
        "product": product,
        "shopping_session": shopping_session_id
    }

    # Validate the data against the cart item serializer
    serializer = CartItemSerializer(data=cart_item_data)

    # If data is invalid, raise a bad request error
    if serializer.is_valid() == False:
        return Response(INVALID_CART_ITEM, status=status.HTTP_400_BAD_REQUEST)

    # Save the cart item to the database
    serializer.save()

    return Response(status=status.HTTP_201_CREATED)