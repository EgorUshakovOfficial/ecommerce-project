from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Models
from ..models import ShoppingSession

# Serializers
from ..serializers import ShoppingSessionSerializer

# Utilities
from utils.config_cookie_options import config_cookie_options

# Constants
from ..constants import COOKIE_NAME

# Handles POST /api/shopping_sessions/data
@api_view(['POST'])
def shopping_session_retrieve(request):
    # Initialize search filter
    search = {}

    # Retrieve user Id number from the request object
    user_id = request.data.get('user')

    # If user does not exist, raise a missing field error
    if user_id is not None:
        search['user_id'] = user_id

    # Search for shopping session using user Id number in the database
    shopping_session = ShoppingSession.get_shopping_session(search)

    # If instance of shopping session is not found, raise a not found error
    if shopping_session is None:
        return Response({"error":"Not Found", "message":"The shopping session not found in the database"}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the shopping session retrieved from the database
    serializer = ShoppingSessionSerializer(shopping_session)

    # Initialize response
    response = Response(serializer.data, status=status.HTTP_200_OK)

    # Set shopping session Id as cookie
    cookie_options = config_cookie_options(COOKIE_NAME, serializer.data.get('id'))
    response.set_cookie(**cookie_options)

    return response




