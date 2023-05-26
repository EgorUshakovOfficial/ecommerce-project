import uuid
from django.db import models

# Models
from apps.users.models import User


# Shopping session
class ShoppingSession(models.Model):
    # Shopping session Id number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # User
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Subtotal
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    # Time shopping session is created
    created_At = models.DateField(auto_now=False, auto_now_add=True)

    # Time shopping session is modified
    modified_at = models.DateField(auto_now=True, auto_now_add=False)