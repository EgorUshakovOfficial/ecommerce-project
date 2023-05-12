from rest_framework import generics
from apps.products.models import Product
from apps.products.serializers import ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    queryset =  Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'


product_view = ProductDetail.as_view()