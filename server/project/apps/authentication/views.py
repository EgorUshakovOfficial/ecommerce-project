from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Serializers
from .serializers import ExchangeCodeSerializer

# Utilities
from utils.config_cookie_options import config_cookie_options
from .utils import config_google_flow

# Services
from .services import get_access_token

@api_view(['POST'])
def google_auth_view(request):
    # Exchange code serializer
    serializer = ExchangeCodeSerializer(data=request.data)

    # Exchange code is valid
    if serializer.is_valid():
        # Configure Google flow
        flow = config_google_flow()

        # Read the authorization code
        authorization_code = serializer.validated_data['code']

        # Fetch credentials from the Google API
        flow.fetch_token(code=authorization_code)
        credentials = flow.credentials

        # Access token
        access_token = credentials.token

        # Initialize response
        response = Response({"accessToken":access_token}, status=status.HTTP_200_OK)

        # Set refresh token as cookie
        refresh_token = credentials.refresh_token
        cookie_options = config_cookie_options("refresh", refresh_token)
        response.set_cookie(**cookie_options)

        return response

@api_view(['GET'])
def google_refresh_view(request):
    # Read the refresh token value
    refresh_token = request.COOKIES.get('refresh')

    # Refresh token does not exist
    if refresh_token is None:
        return Response({"error":"Bad Request", "message":"Missing refresh token"}, status=status.HTTP_400_BAD_REQUEST)

    # Get access token
    try:
        data = get_access_token(refresh_token)

        return Response(data, status=status.HTTP_200_OK)

    except:
        return Response({"error":"Unauthorized", "message":"Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def google_logout_view(request):
    # Read the refresh token value
    refresh_token = request.COOKIES.get('refresh')

    # Read the shopping session value
    shopping_session = request.COOKIES.get('shopping_session')

    # Initialize response
    response = Response()

    # If refresh token exists, delete it
    if refresh_token:
        response.delete_cookie('refresh', path='/', domain=None, samesite="None")

    # If shopping session exists, delete it
    if shopping_session:
        response.delete_cookie('shopping_session', path='/', domain=None, samesite="None")

    return response

