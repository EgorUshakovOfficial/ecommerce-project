import uuid
from django.db import models

class GiftCard(models.Model):
    # Gift Id
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Gift Amount
    amount = models.DecimalField(max_digits=6, decimal_places=2)

    # Gift code
    code = models.CharField(max_length=16)


