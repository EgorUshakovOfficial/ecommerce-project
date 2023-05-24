import requests
import re
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

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

    # def get_refresh_token(self, request):

    #     # Check if refresh token exists
    #     if refresh_token is None:
    #         return None

    #     # Get expiration date
    #     expiration_date_str =refresh_token.get('expires')

    #     # Parse the expiration date string to a datetime object
    #     expiration_date = datetime.strptime(expiration_date_str, "%a, %d %b %Y %H:%M:%S %Z")

    #     # Compare with the current datetime
    #     current_date = datetime.now()

    #     return expiration_date < current_date


    def get(self, request):
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

        # Data retrieved from Google API
        data = google_response.json()

        # Successful response (status code 200)
        if google_response.status_code == 200:
            return Response(data, status=google_response.status_code)

        else:
            error = {"error":data['error']['status'], "message":"Invalid credentials"}

            return Response(error, status=google_response.status_code)

# View
google_user_view = GoogleUser.as_view()







