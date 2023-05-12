from apps.products.models import Product, ProductImage
from rest_framework import serializers

# Product Image Serializer
from .ProductImageSerializer import ProductImageSerializer

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    # Product Images
    product_images = serializers.SerializerMethodField()

    class Meta:
        model = Product

        # Fieldnames
        fields = ["id", "title", "description", "quantity", "price", "product_images"]

    def get_product_images(self, product):
        # Query set for product images
        queryset = ProductImage.objects.filter(product=product.id)

        # Product images
        product_images = [ProductImageSerializer(product_image).data for product_image in queryset]

        return product_images