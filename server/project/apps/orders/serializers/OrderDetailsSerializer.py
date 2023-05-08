from rest_framework import serializers

# Order Details
from ..models.Order import Order

# Order Details Serializer
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order

        # Fields
        fields = ['total_amount', 'order_date', 'order_number']