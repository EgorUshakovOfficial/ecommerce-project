from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Serializers
from ..serializers import ReviewSerializer

# Review view with full CRUD functionality
class ReviewView(APIView):
    # Retrieve specified review of the product from the database
    # Args:
    #   request: Request object
    # Return:
    #   response: Response object
    def get(self, request):
        pass

    # Updates specified review of the product in the database
    # Args:
    #   request: Request object
    # Return:
    #   response: Response object
    def put(self, request):
        pass

    # Creates new review of the product in the database
    # Args:
    #   request: Request object
    # Return:
    #   response: Response object
    def post(self, request):
        pass

    # Delete specified review of the product from the database
    # Args:
    #   request: Request object
    # Return:
    #   response: Response object
    def delete(self, request):
        pass

# View
review_view = ReviewView.as_view()