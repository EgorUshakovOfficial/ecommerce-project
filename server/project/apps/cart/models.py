from django.db import models

# Product
from apps.products.models import Product

class CartItem(models.Model):
    # Cart Item's quantity
    quantity = models.PositiveIntegerField()

    # Product
    product = models.OneToOneField(Product, on_delete=models.CASCADE)