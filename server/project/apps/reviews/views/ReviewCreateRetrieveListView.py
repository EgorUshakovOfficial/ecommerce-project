from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Settings
from django.conf import settings

# Models
from apps.users.models import User
from ..models import Review

# Serializers
from ..serializers import ReviewSerializer

# Utils
from utils.s3_instance import s3
from utils.create_error import create_error

# Review Create and Retrieve List view
class ReviewCreateRetrieveListView(APIView):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.BAD_REQUEST = create_error('Bad Request', 'The review data is invalid')

    # Upload image to Amazon S3
    # Args:
    #   image: Image file
    # Return
    #   Amazon S3 URL
    def upload_image_to_s3(self, image):
        # Generate a unique key for the image in S3
        image_key = f"reviews/{image.name}"

        # Upload the image to Amazon S3
        s3.upload_fileobj(image, settings.AWS_STORAGE_BUCKET_NAME, image_key)

        # Construct the S3 URL of the uploaded image
        s3_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{image_key}"

        return s3_url

    # Create a new review in the database
    # Args:
    # response: Response object
    # Return:
    #   Response object
    def post(self, request, **kwargs):
        # Get the uploaded image file from the request
        image_file = request.FILES.get('image')

        # If image file does not exist, raise a bad request error
        if image_file is None:
            error = create_error('Missing file', 'The image file is required')
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        # Extract the product Id number from the keyword arguments
        product_id = kwargs.get('product_id')

        # Retrieve user from the body of the request
        user_id = request.data.get('user')

        # If the user does not exist, raise a missing field error
        if user_id is None:
            error = create_error('Missing field', 'The user field is required')
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        # If the user is not found in the database, raise a not found error
        user = User.get_user_by_id(user_id)

        # Retrieve feedback from the body of the request
        feedback = request.data.get('feedback')

        # If the feedback field does not exist, raise a missing field error
        if feedback is None:
            error = create_error('Missing field', 'The feedback field is required')
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve rating from the body of the request
        rating = request.data.get('rating')

        # If the rating field does not exist, raise a missing field error
        if rating is None:
            error = create_error('Missing field', 'The rating field is required')
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        # Upload image to S3 bucket
        s3_url = self.upload_image_to_s3(image_file)

        # Initialize review data
        review_data = {
            'user': user_id,
            'product': product_id,
            'feedback': feedback,
            'rating': rating,
            'media_url': s3_url
        }

        # Validate review data against its serializer
        serializer = ReviewSerializer(data=review_data)

        # If data is invalid, raise a bad request error
        if serializer.is_valid() == False:
            return Response(self.BAD_REQUEST, status=status.HTTP_400_BAD_REQUEST)

        # Save new review in the database
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Retrieve list of reviews associated with the specified product
    # Args:
    # request: Request Object
    # Return:
    #   Response object
    def get(self, request, **kwargs):
        # Retrieve product Id number from the request object
        product_id = kwargs.get('product_id')

        # Search for all of the reviews pertaining to the product
        reviews = Review.objects.filter(product=product_id)

        # Serializer the list of all of the reviews associated with the product
        serializer = ReviewSerializer(reviews, many=True)

        return Response({"reviews":serializer.data}, status=status.HTTP_200_OK)

# View
review_create_retrieve_list_view = ReviewCreateRetrieveListView.as_view()