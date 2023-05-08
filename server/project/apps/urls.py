from apps.products.views import product_list
from django.urls import path

# API endpoints
urlpatterns = [
    path('products', product_list, name="products"),
]