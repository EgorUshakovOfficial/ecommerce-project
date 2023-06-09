from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
import uuid

# Custom user model
from .User import User

# User Address
class UserAddress(models.Model):
    # User Address Id number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # User
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Street address
    street_address = models.CharField(max_length=60)

    # City
    city = models.CharField(max_length=20)

    # Postal Code
    postal_code = models.CharField(max_length=6)

    # Region
    region = models.CharField(max_length=2)

    # Country
    country = models.CharField(max_length=20)