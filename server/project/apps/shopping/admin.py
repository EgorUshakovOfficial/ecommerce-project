from django.contrib import admin

# Models
from .models import CartItem, ShoppingSession

# Register Cart Item
admin.site.register(CartItem)
admin.site.register(ShoppingSession)
