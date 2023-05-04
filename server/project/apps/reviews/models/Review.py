import uuid
from django.db import models

# Product and User
from apps.users.models.User import User
from apps.products.models.Product import Product

# Review
class Review(models.Model):
    # Review ID number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Product
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    # User
    user = models.ForeignKey(User, on_delete=models.RESTRICT)

    # Rating
    rating = models.IntegerField()

    # Review's media url
    media_url = models.TextField()

    # Review Feedback
    feedback = models.TextField(max_length=500)



