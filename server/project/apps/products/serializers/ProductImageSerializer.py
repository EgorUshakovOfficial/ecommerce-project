from apps.products.models import ProductImage
from rest_framework import serializers

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['color_name', 'hexacode', 'main_image', 'image_url']
