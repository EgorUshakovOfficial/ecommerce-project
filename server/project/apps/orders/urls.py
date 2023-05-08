from django.urls import path

from .views.OrderDetail import order_view

urlpatterns = [
    path('orders', order_view, name='order')
]