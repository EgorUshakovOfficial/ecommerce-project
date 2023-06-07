from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Models
from ..models import ShoppingSession

# Serializer
from ..serializers import ShoppingSessionSerializer

# Utilities
from utils import config_cookie_options, create_error

# Constants
from ..constants import COOKIE_NAME, COOKIE_NOT_FOUND

class ShoppingSessionCreateDestroyUpdate(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.BAD_REQUEST = create_error("Bad Request", "The shopping session data is invalid")
        self.COOKIE_NAME = COOKIE_NAME
        self.COOKIE_ERROR_MESSAGE = COOKIE_NOT_FOUND
        self.INSTANCE_NOT_FOUND = create_error("Not Found", "The shopping session not found in the database")
        self.MISSING_SUBTOTAL = create_error("Missing Subtotal", "The subtotal field is required")
        self.MISSING_USER = create_error("Missing Field", "The user field is required")

    # Extracts subtotal and user from the request object
    # Args:
    #   request: Request object
    # Return:
    #   subtotal: Subtotal
    #   user: User's Id number
    def get_shopping_data(self, request):
        # Retrieve subtotal and user data
        subtotal = request.data.get('subtotal')
        user = request.data.get('user')

        return subtotal, user

    # Handles PUT /api/shopping
    def put(self, request):
        # Read the shopping session Id number from cookie
        shopping_session_id = request.COOKIES.get(self.COOKIE_NAME)

        # Shopping session cookie does not exist
        if shopping_session_id is None:
            return Response(self.COOKIE_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)

        # Initialize shopping session data
        subtotal, user_id = self.get_shopping_data(request)

        # If subtotal does not exist, raise a missing field error
        if subtotal is None:
            return Response(self.MISSING_SUBTOTAL, status=status.HTTP_400_BAD_REQUEST)

        # Intialize shopping session data
        shopping_session_data = {"subtotal":subtotal, "user":user_id}

        # Search shopping session by Id obtained from the cookie in the database
        shopping_session = ShoppingSession.get_shopping_session_by_id(shopping_session_id)

        # If shopping session is not found in the database, raise a not found error
        if shopping_session is None:
            return Response(self.INSTANCE_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)

        # Validate the shopping session data against the shopping session serializer
        serializer = ShoppingSessionSerializer(instance=shopping_session, data=shopping_session_data)

        # If shopping session data is invalid, raise a bad request error
        if serializer.is_valid() == False:
            return Response(self.BAD_REQUEST, status=status.HTTP_400_BAD_REQUEST)

        # Save the existing shopping session in the database
        serializer.save()

        return Response()

    # Handles POST /api/shopping
    def post(self, request):
        # Get shopping data from the request
        subtotal, user_id = self.get_shopping_data(request)

        # If subtotal does not exist, set it to 0
        if subtotal is None:
            subtotal = 0

        # If user does not exist, raise a missing field error
        if user_id is None:
            return Response(self.MISSING_USER, status=status.HTTP_400_BAD_REQUEST)

        # Initialize shopping session data
        shopping_session_data = {"subtotal":subtotal, "user":user_id}

        # Validate the shopping session data against its serializer
        serializer = ShoppingSessionSerializer(data=shopping_session_data)

        # If shopping session data is invalid, raise a bad request error
        if serializer.is_valid() == False:
            return Response(self.BAD_REQUEST, status=status.HTTP_400_BAD_REQUEST)

        # Save shopping session in the database
        serializer.save()

        # Initialize response
        response = Response(status=status.HTTP_201_CREATED)

        # Set shopping session cookie
        cookie_options = config_cookie_options(self.COOKIE_NAME, serializer.data.get('id'))
        response.set_cookie(**cookie_options)

        return response

    # Handles DELETE /api/shopping
    def delete(self, request):
        # Read the value of the shopping session cookie
        shopping_session_id = request.COOKIES.get(self.COOKIE_NAME)

        # Shopping session cookie does not exist
        if shopping_session_id is None:
            return Response(self.COOKIE_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)

        # Search for shopping session using Id in the database
        shopping_session = ShoppingSession.get_shopping_session_by_id(shopping_session_id)

        # Delete shopping session from the database if it exists
        if shopping_session is not None:
            shopping_session.delete()

        # Initialize response
        response = Response()

        # Remove cookie from response
        response.delete_cookie(self.COOKIE_NAME, path='/', domain=None, samesite="None")

        return response

# View
shopping_session_create_destroy_update = ShoppingSessionCreateDestroyUpdate.as_view()