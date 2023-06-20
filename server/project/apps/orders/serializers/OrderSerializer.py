from rest_framework import serializers

# Order Details
from ..models.Order import Order

# Order Details Serializer
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order

        # Fields
        fields = ['id', 'total',  'user', 'order_number', 'created_at', 'modified_at']

        # Extra keyword arguments
        extra_kwargs = {'user': {'write_only': True}}