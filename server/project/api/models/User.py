import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

# Customized User model
class User(AbstractUser):
    # Overrides user ID number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Email subscription
    email_subscribed = models.BooleanField(default=False)





