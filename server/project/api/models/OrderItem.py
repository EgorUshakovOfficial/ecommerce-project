import uuid
from django.db import models

# Product
from .OrderDetails import OrderDetails
from .Product import Product

# Order Item
class OrderItem(models.Model):
    # Order ID number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Order Details
    order_details = models.ForeignKey(OrderDetails, on_delete=models.CASCADE)

    # Product
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
