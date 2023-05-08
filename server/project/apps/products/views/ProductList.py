from products.models import Product
from products.models import Product
from products.serializers import ProductSerializer
from rest_framework import generics

# Product list
class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer