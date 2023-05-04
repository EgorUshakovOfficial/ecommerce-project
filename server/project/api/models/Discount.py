import uuid
from django.db import models

# Discount
class Discount(models.Model):
    # Discount ID number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Discount Code
    code = models.CharField(max_length=10)

    # Discount percentage
    percentage = models.DecimalField(max_digits=4, decimal_places=2)

    # Discount active
    active = models.BooleanField(default=True)

    # Expiration date
    expiration_date = models.DateTimeField(default=None)
