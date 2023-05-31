import requests
import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# User model
from apps.users.models import User

# User serializer
from apps.users.serializers import UserSerializer

class GoogleUser(APIView):
    def get_user_info_url(self, token):
        user_info_url = f'https://www.googleapis.com/oauth2/v1/userinfo?access_token={token}'

        return user_info_url

    def from_authorization_extract_token(self, authorization_header):
        if authorization_header:
            # Retrieve value of the access token from the value of the Authorization header
            access_token = re.sub(r'^Bearer\s+', '', authorization_header)

            return access_token

        return None

    def post(self, request):
        # Extract the access token from the Authorization header
        authorization_header = request.headers.get('Authorization')

        # Extract access token from the Authorization header
        access_token = self.from_authorization_extract_token(authorization_header)

        # No Authorization header exists in request object
        if access_token == None:
            return Response({
                    "error":"Invalid Authorization header",
                    "message": "Access token not found"
            }, status=status.HTTP_400_BAD_REQUEST)

        # User information url from which email and profile information are retrieved
        user_info_url = self.get_user_info_url(access_token)

        # Send GET request to the Google API
        google_response = requests.get(user_info_url)

        # Convert data from body of the Google response into JSON
        google_data = google_response.json()

        # Successful response (status code 200)
        if google_response.status_code == 200:
            # Initialize email and data
            email = google_data['email']
            data = {
                'email':email,
                'first_name': google_data['given_name'],
                'last_name': google_data['family_name']
            }

            # Search for user using email in the database
            user = User.get_user_by_email(self=User, email=email)

            # If user is not found, create one in the database
            if user == None:
                # Validate fields against the user serializer
                serializer = UserSerializer(data=data)

                # If data is valid, create new object in the database
                if serializer.is_valid():
                    # Save new user in the database
                    serializer.save()

                    return Response(serializer.data, status=status.HTTP_201_CREATED)

            # Otherwise, update existing user in the database
            else:
                # Validate fields against the user serializer
                serializer = UserSerializer(instance=user, data=data)

                # If data is valid, update fields in the existing user object
                if serializer.is_valid():
                    serializer.save()

                    return Response(serializer.data, status=status.HTTP_200_OK)

            return Response({"error":"Internal Server Error", "message":"Something went wrong on our server. We apologize for the inconvenience. Our team has been notified and is working to fix the issue. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
            error = {"error":google_data['error']['status'], "message":"Invalid credentials"}

            return Response(error, status=google_response.status_code)

# View
google_user_view = GoogleUser.as_view()







