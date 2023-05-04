import uuid
from django.db import models

# User
from .User import User

# Product
class Product(models.Model):
    # Product ID number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # User ID number
    user_profile = models.ForeignKey(User, on_delete=models.RESTRICT)

    # Product Title
    title = models.CharField(max_length=100)

    # Product Description
    description = models.TextField()

    # Product quantity
    quantity = models.PositiveIntegerField()

    # Product price
    price = models.DecimalField(max_digits=10, decimal_places=2)


