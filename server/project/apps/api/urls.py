from django.urls import path
from .views import order_view

# API endpoints
urlpatterns = [
    path('orders', order_view)
]