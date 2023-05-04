from django.contrib import admin

from .models.Product import Product

from .models.ProductImage import ProductImage

# Register Product
admin.site.register(Product)

# Register Product Image
admin.site.register(ProductImage)