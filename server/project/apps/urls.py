from apps.products.views import product_list, product_view
from django.urls import path, register_converter
from django.urls.converters import UUIDConverter

# Registers UUID converter
register_converter(UUIDConverter, 'UUID')

# API endpoints
urlpatterns = [
    # Products List
    path('products', product_list, name="products"),

    # Product View
    path('products/<UUID:id>', product_view, name="product")
]