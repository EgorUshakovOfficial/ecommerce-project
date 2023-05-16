# Order views
from apps.orders.views import order_view

#  Product views
from apps.products.views import product_list, product_view

# Authentication views
from apps.authentication.views import google_auth_view

from django.urls import path, register_converter
from django.urls.converters import UUIDConverter

# Registers UUID converter
register_converter(UUIDConverter, 'UUID')

# API endpoints
urlpatterns = [
    # Order views
    path('orders', order_view, name="orders"),

    # Products views
    path('products', product_list, name="products"),
    path('products/<UUID:id>', product_view, name="product"),
    path('auth/refresh', google_auth_view, name="google_auth")
]