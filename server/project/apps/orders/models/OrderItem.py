import uuid
from django.db import models

# Product
from .Order import Order
from apps.products.models import Product

# Order Item
class OrderItem(models.Model):
    # Order ID number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Order Details
    order_details = models.ForeignKey(Order, on_delete=models.CASCADE)

    # Product
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    # Quantity
    quantity = models.PositiveIntegerField(default=1)

    # Created at
    created_at = models.DateField(auto_now=False, auto_now_add=True)

    # Modified at
    modified_at = models.DateField(auto_now=True, auto_now_add=False)