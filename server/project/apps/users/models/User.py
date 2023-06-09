from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
import uuid

from .CustomUserManager import CustomUserManager

# Custom user model
class User(AbstractBaseUser, PermissionsMixin):
    # User Id number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # First name
    first_name = models.CharField(max_length=30)

    # Last name
    last_name = models.CharField(max_length=30)

    # Email subscription
    email_subscribed = models.BooleanField(default=False)

    email = models.EmailField(unique=True)

    is_staff = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)

    is_superuser = models.BooleanField(default=False)

    # Date user joined
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    # Searches for user object by email in the database
    # Args:
    #   email: User's email
    def get_user_by_email(self, email):
        try:
            user = self.objects.get(email=email)
            return user
        except self.DoesNotExist:
            return None

    @classmethod
    # Searches for user object by user Id in the database
    # Args:
    #   user_id: User's Id number
    # Returns:
    #   User object-if it's not found, None
    def get_user_by_id(self, user_id):
        try:
            user = self.objects.get(id=user_id)
            return user
        except self.DoesNotExist:
            return None

    def __str__(self):
        return self.email
