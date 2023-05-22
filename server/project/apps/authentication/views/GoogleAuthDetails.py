from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google_auth_oauthlib.flow import Flow
from django.conf import settings


# Serializers
from ..serializers import ExchangeCodeSerializer


class GoogleAuthDetails(APIView):
    # Configures Google client flow
    def config_google_client(self):
         # Scopes
         scopes = [
            "openid",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
         ]

         flow = Flow.from_client_secrets_file(
             settings.GOOGLE_OAUTH2_CLIENT_SECRET,
             scopes=scopes,
             redirect_uri = "http://localhost:3000"
        )

         return flow

    def post(self, request):
        # Exchange code serializer
        serializer = ExchangeCodeSerializer(data=request.data)

        # Exchange code is valid
        if serializer.is_valid():
            # Configures Google client
            flow = self.config_google_client()

            # Authorization code
            code = serializer.validated_data['code']

            # Retrieve credentials from Google API
            flow.fetch_token(code=code)
            credentials = flow.credentials

            # Access token
            access_token = credentials.token

            # Initialize response
            response = Response({"accessToken":access_token}, status=status.HTTP_200_OK)

            # Set refresh token as Http-only cookie
            refresh_token = credentials.refresh_token
            response.set_cookie(
                key="refresh",
                value=refresh_token,
                secure=True, # Change this to true in production
                samesite="None",
                httponly=True,
                max_age=60*60*24*30
            )

            return response
# View
google_auth_view = GoogleAuthDetails.as_view()



