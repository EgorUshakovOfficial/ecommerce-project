import uuid
from django.db import models

# User
from apps.users.models import User

# Product
class Product(models.Model):
    # Product ID number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # User ID number
    user = models.ForeignKey(User, on_delete=models.RESTRICT)

    # Product Title
    title = models.CharField(max_length=100)

    # Product Description
    description = models.TextField()

    # Product quantity
    quantity = models.PositiveIntegerField()

    # Product price
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.title
