from django.contrib import admin

# Order model
from .models.Order import Order

# Order Item model
from .models.OrderItem import OrderItem

# Register Order Details
admin.site.register(Order)

# Register Order Item
admin.site.register(OrderItem)
