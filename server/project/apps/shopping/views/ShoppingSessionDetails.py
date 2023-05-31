from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Models
from apps.users.models import User

# Serializer
from apps.users.serializers import UserSerializer
from ..serializers import CartItemSerializer, ShoppingSessionSerializer

class ShoppingSessionDetails(APIView):
    # Post
    def post(self, request):
        # Initialize user data
        user_data = request.data.get('user')

        # User data does not exist
        if user_data == None:
            return Response({"error":"Missing Field", "message":"The user field is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Initialize email
        email = user_data.get('email')

        # Email does not exist
        if email == None:
            return Response({"error":"Missing Field", "message":"The email field in user is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Search user by email in the database
        user = User.get_user_by_email(self=User, email=email)

        # User is not found in the database
        if user == None:
            return Response({"error":"Not Found", "message":"The user is not found in the database"}, status=status.HTTP_404_NOT_FOUND)

        # Validate user data against the user serializer
        user_serializer = UserSerializer(instance=user, data=user_data)

        # User data is not valid
        if user_serializer.is_valid() == False:
            return Response({"error":"Missing Field", "message":"One or more required field(s) in user are missing"}, status=status.HTTP_400_BAD_REQUEST)

        # Initialize subtotal
        subtotal = request.data.get('subtotal')

        # Subtotal field does not exist
        if subtotal == None:
            return Response({"error":"Missing Field", "message":"The subtotal field is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Initialize shopping data
        shopping_data = {'subtotal': subtotal, 'user':user.pk}

        # Create shopping session
        shopping_session_serializer = ShoppingSessionSerializer(data=shopping_data)

        # Shopping session data is valid
        if shopping_session_serializer.is_valid():
            # Save shopping session to the database
            shopping_session_serializer.save()

            # Initialize cart and cart serializers list
            cart_serializers = []
            cart = request.data.get('cart')

            # Iterate through every item in cart
            for cart_item in cart:
                # Initialize quantity, product, and cart item data
                cart_item_quantity = cart_item.get('quantity')
                cart_item_product = cart_item.get('product')
                cart_item_data = {
                    'quantity': cart_item_quantity,
                    'product': cart_item_product.get('id'),
                    'shopping_session': shopping_session_serializer.data.get('id')
                }

                # Initialize cart item serializer
                cart_item_serializer = CartItemSerializer(data=cart_item_data)

                # Respond with an error message if data is not valid
                if cart_item_serializer.is_valid():
                    # Add it to the cart serializers list
                    cart_serializers.append(cart_item_serializer)

                else:
                    # Shopping session Id number
                    shopping_session_id = shopping_session_serializer.data.get('id')

                    # Delete shopping session in the database
                    shopping_session_serializer.destroy(shopping_session_id)

                    return Response({"error":"Missing field", "message":"One or more required field(s) in cart item are missing"}, status=status.HTTP_400_BAD_REQUEST)

            # Iterate through every cart item serializer
            for cart_item_serializer in cart_serializers:
                if cart_item_serializer.is_valid(): # This line is needed. Otherwise, an assertion error is thrown
                    # Save cart item object to the database
                    cart_item_serializer.save()

            return Response({"message":"Shopping session and cart items created"}, status=status.HTTP_201_CREATED)

        else:
            return Response({"error":"", "message":""}, status=status.HTTP_400_BAD_REQUEST)

# View
shopping_session_view = ShoppingSessionDetails.as_view()