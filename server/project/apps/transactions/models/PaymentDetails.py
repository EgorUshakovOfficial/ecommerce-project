import uuid
from django.db import models

# Order
from apps.orders.models.Order import Order

# User
from apps.users.models.User import User

# Order Details and User
class PaymentDetails(models.Model):
    # Payment ID number
    payment_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Order Details
    order_details = models.OneToOneField(Order, on_delete=models.SET_NULL, null=True)

    # User
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Payment provider
    provider =  models.CharField(max_length=20)

    # Payment amount
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2)

