import requests
from django.conf import settings

def get_access_token(refresh_token):
    # URL for requesting new access token
    base_url = 'https://oauth2.googleapis.com/token'

    body = {
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id':settings.GOOGLE_CLIENT_ID,
        'client_secret':settings.GOOGLE_CLIENT_SECRET
    }

    # Initialize response received from the Google API
    response = requests.post(base_url, data=body)

    # Extract access token from the body of the response
    try:
        data = response.json()

        access_token = data['access_token']

        return {"accessToken":access_token}

    # Otherwise, response is unauthorized
    except Exception as e:
        raise e

