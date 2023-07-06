# Authentication views
from apps.authentication.views import google_auth_view, google_refresh_view, google_logout_view

# Order views
from apps.orders.views import order_create_view

#  Product views
from apps.products.views import product_list, product_view

# Reviews
from apps.reviews.views import review_create_retrieve_list_view

# Shopping session
from apps.shopping.views import cart_item_retrieve_update_delete, cart_item_create, cart_item_list_view, shopping_session_create_destroy_update, shopping_session_retrieve

# Users views
from apps.users.views import google_user_view

from django.urls import path, register_converter
from django.urls.converters import UUIDConverter

# Registers UUID converter
register_converter(UUIDConverter, 'UUID')

# API endpoints
urlpatterns = [
    # Authentication views
    path('auth/google/login', google_auth_view, name="google_auth"),
    path('auth/google/refresh', google_refresh_view, name='google_refresh'),
    path('auth/logout', google_logout_view, name="google_logout"),

    # Order views
    path('orders', order_create_view, name="orders_create"),

    # Products views
    path('products', product_list, name="products"),
    path('products/<UUID:id>', product_view, name="product"),
    path('products/<UUID:product_id>/reviews', review_create_retrieve_list_view, name="review_create_retrieve_list"),

    # Shopping
    path('shopping', shopping_session_create_destroy_update, name="shopping_session_operations"),
    path('shopping/data', shopping_session_retrieve, name='shopping_session_retrieve'),
    path('shopping/cart', cart_item_list_view, name="cart_list"),
    path('shopping/cart/cart_items', cart_item_create, name="cart_item_create"),
    path('shopping/cart/cart_items/<UUID:cart_item_id>', cart_item_retrieve_update_delete, name="cart_item"),

    # Users views
    path('users/google/me', google_user_view, name="google_user")
]