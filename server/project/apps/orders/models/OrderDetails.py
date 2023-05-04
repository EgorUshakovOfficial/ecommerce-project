import uuid
from django.db import models

# Order Details
class OrderDetails(models.Model):
    # Order ID number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Total amount paid
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    # Order date
    order_date = models.DateField(auto_now=False, auto_now_add=True)

    # Order number
    order_number = models.CharField(max_length=12)