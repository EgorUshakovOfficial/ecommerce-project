from django.contrib import admin

from .models import Product, ProductImage

# Register Product
admin.site.register(Product)

# Register Product Image
admin.site.register(ProductImage)