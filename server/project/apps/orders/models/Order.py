import uuid
from django.db import models

# Models
from apps.users.models import User

# Order Details
class Order(models.Model):
    # Order ID number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Total amount paid
    total = models.DecimalField(max_digits=10, decimal_places=2)

    # User
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Order number
    order_number = models.CharField(max_length=8)

    # Date when order placed
    created_at = models.DateField(auto_now=False, auto_now_add=True)

    # Date when order changed
    modified_at = models.DateField(auto_now=True, auto_now_add=False)


