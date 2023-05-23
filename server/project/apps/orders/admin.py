from django.contrib import admin

# Order and Order Item models
from .models import Order, OrderItem

# Register Order Details
admin.site.register(Order)

# Register Order Item
admin.site.register(OrderItem)
