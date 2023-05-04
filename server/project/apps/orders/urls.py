from django.urls import path

from .views import order_view

urlpatterns = [
    path('orders', order_view, name='orders')
]