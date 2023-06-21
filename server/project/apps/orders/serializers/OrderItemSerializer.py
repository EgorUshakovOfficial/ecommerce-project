from rest_framework import serializers

# Models
from ..models import OrderItem

# Order item serializer
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem

        fields = [
            'id',
            'order_details',
            'product',
            'quantity',
            'created_at',
            'modified_at'
        ]
