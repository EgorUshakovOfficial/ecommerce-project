from apps.products.models import Product
from apps.products.serializers import ProductSerializer
from rest_framework import generics

# Product list
class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Product list view
product_list = ProductList.as_view()