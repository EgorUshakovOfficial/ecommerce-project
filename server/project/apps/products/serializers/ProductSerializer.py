from apps.products.models import Product
from rest_framework import serializers

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product

        # Product fieldnames
        fields = ['title', 'description', 'quantity', 'price']