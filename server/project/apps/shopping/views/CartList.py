from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Models
from ..models import CartItem

# Serializer
from ..serializers import CartItemSerializer

class CartList(APIView):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.COOKIE_NAME = 'shopping_session'
        self.COOKIE_NOT_FOUND = {"error":"Missing Cookie", "message":"The required cookie 'shopping_session' is missing"}

    # Extracts quantity and product fields from the request object
    # Args:
    #   request: Request object
    # Return:
    #   subtotal: The total cost of all cart items
    #   product: Product information about the cart item
    def get_required_fields(self, request):
        # Retrieve quantity and product fields from the request object
        quantity = request.data.get('quantity')
        product = request.data.get('product')

        return quantity, product

    # Handles POST /api/shopping/:shopping_session_id/cart
    def post(self, request):
        # Retrieve the shopping session value from cookie
        shopping_session_id = request.COOKIES.get('shopping_session')

        # Shopping session Id cookie does not exist
        if shopping_session_id is None:
            return Response(self.COOKIE_NOT_FOUND, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve quantity and product fields from the request object
        quantity, product = self.get_required_fields(request)

        # Quantity field does not exist
        if quantity is None:
            return Response({"error":"Missing field", "message":"The quantity field is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Product field is missing
        if product is None:
            return Response({"error":"Missing field", "message":"The product field is missing"}, status=status.HTTP_400_BAD_REQUEST)

        # Initialize shopping data
        shopping_data = {
            'shopping_session': shopping_session_id,
            'quantity': quantity,
            'product': product
        }

        # Validate data against the cart item serializer
        serializer = CartItemSerializer(data=shopping_data)

        # If data is invalid, raise a bad request error
        if serializer.is_valid() == False:
            return Response({"error":"Bad Request", "message":"The cart item data is invalid"}, status=status.HTTP_400_BAD_REQUEST)

        # Save new cart item to the database
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Handles GET /api/shopping/cart
    def get(self, request):
        # Retrieve the shopping session value from cookie
        shopping_session_id = request.COOKIES.get('shopping_session')

        # Shopping session Id cookie does not exist
        if shopping_session_id is None:
            return Response(self.COOKIE_NOT_FOUND, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve all cart items in the shopping session
        cart = CartItem.objects.filter(shopping_session=shopping_session_id)

        # Validate data against the cart serializer
        serializer = CartItemSerializer(cart, many=True)

        return Response({"cart":serializer.data}, status=status.HTTP_200_OK)
# View
cart_list_view = CartList.as_view()