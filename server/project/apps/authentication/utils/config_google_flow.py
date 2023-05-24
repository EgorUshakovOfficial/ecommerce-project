from django.conf import settings
from google_auth_oauthlib.flow import Flow

# Configure Google flow
def config_google_flow():
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