from rest_framework import serializers

# Models
from ..models import CartItem

# Serializers
from apps.products.serializers import ProductSerializer

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'shopping_session']
        extra_kwargs= {
            'product': {'write_only':True},
            'shopping_session':{'write_only':True}
        }

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['product'] = ProductSerializer(instance.product).data
        return rep

