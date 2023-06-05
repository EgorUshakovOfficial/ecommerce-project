from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Models
from ..models import ShoppingSession

# Serializer
from ..serializers import ShoppingSessionSerializer

# Utils
from utils.config_cookie_options import config_cookie_options

class ShoppingSessionDetails(APIView):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.COOKIE_NAME = 'shopping_session'
        self.COOKIE_ERROR_MESSAGE = {"error":"Missing Cookie", "message":"The required cookie 'shopping_session' is missing"}
        self.INSTANCE_NOT_FOUND = {"error":"Not Found", "message":"The shopping session not found in the database"}

    # Attempts to retrieve shopping session from the database
    # Args:
    #   shopping_session_id: Shopping session Id number
    # Return:
    #   Instance of shopping session or None
    def get_shopping_session(self, shopping_session_id):
        try:
            shopping_session = ShoppingSession.objects.get(id=shopping_session_id)
            return shopping_session
        except ShoppingSession.DoesNotExist:
            return None

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
            return Response({"error":"Missing Cookie", "message":"The required cookie 'shopping_session' is missing"}, status=status.HTTP_400_BAD_REQUEST)

        # Get shopping data from the request
        subtotal, user = self.get_shopping_data(request)

        # If user does not exist, add error to the list
        if user is None:
            return Response({"error":"Missing Field", "error":"The user field is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Initialize shopping data
        subtotal, user = self.get_shopping_data(request)
        shopping_data = {'subtotal':subtotal, 'user':user['id']}

        # Search shopping session by shopping session Id number in the database
        shopping_session = self.get_shopping_session(shopping_session_id)

        # If shopping session is not found in the database, raise a not found error
        if shopping_session is None:
            return Response(self.INSTANCE_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)

        # Validate the shopping session data against the shopping session serializer
        shopping_session_serializer = ShoppingSessionSerializer(instance=shopping_session, data=shopping_data)

        # If shopping session is invalid, raise a bad request error
        if shopping_session_serializer.is_valid() == False:
            return Response({"error":"Bad Request", "message":"The shopping session data is invalid"}, status=status.HTTP_400_BAD_REQUEST)

        # Save the existing shopping session in the database
        shopping_session_serializer.save()

        return Response(status=status.HTTP_200_OK)

    # Handles POST /api/shopping
    def post(self, request):
        # Get shopping data from the request
        subtotal, user = self.get_shopping_data(request)

        # If subtotal does not exist, add error to the list
        if subtotal is None:
            return Response({"error":"Missing Field", "message":"The subtotal field is required"}, status=status.HTTP_400_BAD_REQUEST)

        # If user does not exist, add error to the list
        if user is None:
            return Response({"error":"Missing Field", "error":"The user field is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Initialize shopping session data
        shopping_session_data = {"subtotal":subtotal, "user":user['id']}

        # Validate the shopping session data against its serializer
        shopping_session_serializer = ShoppingSessionSerializer(data=shopping_session_data)

        # If shopping session data is invalid, raise a bad request error
        if shopping_session_serializer.is_valid() == False:
            return Response({"error":"Bad Request", "message":"The shopping session data is invalid or missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        # Save shopping session in the database
        shopping_session_serializer.save()

        # Initialize response
        response = Response(status=status.HTTP_201_CREATED)

        # Set shopping session cookie
        cookie_options = config_cookie_options(self.COOKIE_NAME, shopping_session_serializer.data.get('id'))
        response.set_cookie(**cookie_options)

        return response

    # Handles GET /api/shopping
    def get(self, request):
        # Read the value of the shopping session cookie
        shopping_session_id = request.COOKIES.get(self.COOKIE_NAME)

        # Shopping session cookie does not exist
        if shopping_session_id is None:
            return Response(self.COOKIE_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)

        # Search for shopping session using Id in the database
        shopping_session = self.get_shopping_session(shopping_session_id)

        # Shopping session is not found in the database
        if shopping_session is None:
            return Response(self.INSTANCE_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)

        # Initialize shopping session serializer
        shopping_session_serializer = ShoppingSessionSerializer(shopping_session)

        return Response(shopping_session_serializer.data, status=status.HTTP_200_OK)


    # Handles DELETE /api/shopping
    def delete(self, request):
        # Read the value of the shopping session cookie
        shopping_session_id = request.COOKIES.get(self.COOKIE_NAME)

        # Shopping session cookie does not exist
        if shopping_session_id is None:
            return Response(self.COOKIE_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)

        # Search for shopping session using Id in the database
        shopping_session = self.get_shopping_session(shopping_session_id)

        # Delete shopping session from the database if it exists
        if shopping_session is not None:
            shopping_session.delete()

        # Initialize response
        response = Response()

        # Remove cookie from response
        response.delete_cookie(self.COOKIE_NAME, path='/', domain=None, samesite="None")

        return response


# View
shopping_session_view = ShoppingSessionDetails.as_view()