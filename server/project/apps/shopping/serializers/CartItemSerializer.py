from rest_framework import serializers

# Models
from ..models import CartItem

# Serializers
from apps.products.serializers import ProductSerializer

class CartItemSerializer(serializers.ModelSerializer):
    # Cart item Id number
    id = serializers.UUIDField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'shopping_session']
        extra_kwargs= {
            'product': {'write_only':True},
            'shopping_session':{'write_only':True}
        }

    def create(self, validated_data):
        print(validated_data)

        # Remove cart item Id field from the validated data
        cart_item_id = validated_data.pop('id', None)

        # Create instance of the cart item
        instance = self.Meta.model(**validated_data)

        # Overwrite Id field with cart item Id from the request object in the instance if it exists
        if cart_item_id is not None:
            instance.id = cart_item_id

        # Save cart item instance in the database
        instance.save()

        return instance

    def update(self, instance, validated_data):
        # Extract quantity from the validated data
        instance.quantity = validated_data.get('quantity', instance.quantity)

        # Save the cart item instance
        instance.save()

        return instance


    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['product'] = ProductSerializer(instance.product).data
        return rep

