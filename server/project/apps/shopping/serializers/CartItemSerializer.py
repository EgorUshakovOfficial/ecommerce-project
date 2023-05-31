from rest_framework import serializers

# Models
from ..models import CartItem

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['product', 'shopping_session', 'quantity']