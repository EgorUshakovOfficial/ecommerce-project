from rest_framework import serializers

# Models
from apps.shopping.models import ShoppingSession

# User serializer
from apps.users.serializers import UserSerializer

# Shopping session serializer
class ShoppingSessionSerializer(serializers.ModelSerializer):
    # User serializer
    user = UserSerializer(read_only=True)

    class Meta:
        model = ShoppingSession
        fields = ['subtotal', 'user']