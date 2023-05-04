from django.contrib import admin

from .models.OrderDetails import OrderDetails

from .models.OrderItem import OrderItem

# Register Order Details
admin.site.register(OrderDetails)

# Register Order Item
admin.site.register(OrderItem)
