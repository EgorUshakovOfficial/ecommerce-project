from django.middleware.csrf import CsrfViewMiddleware
from rest_framework.response import Response
from rest_framework import status

class CsrfTokenCheckMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.csrf_middleware = CsrfViewMiddleware()

    def __call__(self, request):
        # Check if CSRF token is present in the request headers
        if not self.csrf_middleware._sanitize_token(request.COOKIES.get("csrftoken")):
            return Response({"error":"Forbidden", "message":"CSRF token missing or invalid"}, status=status.HTTP_403_FORBIDDEN)

        response = self.get_response(request)

        return response