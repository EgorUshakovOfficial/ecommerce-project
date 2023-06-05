from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Models
from ..models import CartItem

# Serializers
from ..serializers import CartItemSerializer

# Cart Item Details
class CartItemDetails(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.INVALID_CART_ITEM = {'error': 'Bad Request', 'message':'The cart item data is invalid'}
        self.INSTANCE_NOT_FOUND = {'error':"Not Found", "message":"The cart item not found in the database"}
        self.COOKIE_NAME = 'shopping_session'
        self.COOKIE_NOT_FOUND = {"error":"Missing Cookie", "message":"The required cookie 'shopping_session' is missing"}

    # Retrieves cart item from the database using cart item Id and shopping session Id
    # Args:
    #   **filter: Filter keyword arguments
    # Return:
    #   Instance of cart item or None
    def get_cart_item(self, **filter):
        try:
            cart_item = CartItem.objects.get(**filter)
            return cart_item
        except CartItem.DoesNotExist:
            return None

    # Retrieves quantity and product from the request object
    # Args:
    #   request: Request object
    # Return
    #   quantity: The number of items added to the cart by the user
    #   product: Product Id number
    def get_required_fields(self, request):
        # Extract quantity and product from the request object
        quantity = request.data.get('quantity')
        product = request.data.get('product')

        return quantity, product

    # Handles PUT /api/shopping_sessions/cart/:cart_item_id
    def put(self, request, cart_item_id):
        # Retrieve the shopping session Id from cookie
        shopping_session_id = request.COOKIES.get(self.COOKIE_NAME)

        # If shopping session Id cookie does not exist, raise a cookie not error
        if shopping_session_id is None:
            return Response(self.COOKIE_NOT_FOUND, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve quantity from the request object
        quantity, product = self.get_required_fields(request)

        # Quantity field does not exist
        if quantity is None:
            return Response({"error":"Missing Field", "message":"The quantity field is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Product field does not exist
        if product is None:
            return Response({"error":"Missing Field", "message":"The product field is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Search for cart item using Id in the database
        cart_item = self.get_cart_item(id=cart_item_id, shopping_session_id=shopping_session_id)

        # Cart item does not exist in the database
        if cart_item is None:
            return Response(self.INSTANCE_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)

        # Initialize cart item data
        cart_item_data = {
            'quantity': quantity,
            'product':product,
            'shopping_session': shopping_session_id
        }

        # Validate cart item data against the cart item serializer
        serializer = CartItemSerializer(instance=cart_item, data=cart_item_data)

        # If cart item data is invalid, raise a bad request error
        if serializer.is_valid() == False:
            return Response(self.INVALID_CART_ITEM, status=status.HTTP_400_BAD_REQUEST)

        # Save the updated instace in the database
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    # Handles DELETE /api/shopping_sessions/cart/:cart_item_id
    def delete(self, request, cart_item_id):
        # Retrieve the shopping session Id from cookie
        shopping_session_id = request.COOKIES.get(self.COOKIE_NAME)

        # If shopping session Id cookie does not exist, raise a cookie not error
        if shopping_session_id is None:
            return Response(self.COOKIE_NOT_FOUND, status=status.HTTP_400_BAD_REQUEST)

        # Search for cart item using Id in the database
        cart_item = self.get_cart_item(id=cart_item_id, shopping_session_id=shopping_session_id)

        # Cart item is not found in the database
        if cart_item is None:
            return Response(self.INSTANCE_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)

        # Delete cart item from the database
        cart_item.delete()

        return Response()


# View
cart_item_view = CartItemDetails.as_view()