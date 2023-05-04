import uuid
from django.db import models

# Product
from .Product import Product

# Product Image
class ProductImage(models.Model):
    # Product Image ID number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Product
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    # Product color
    color_name = models.CharField(max_length=20)

    # Product color's hexacode
    hexacode = models.CharField(max_length=6)

    # Product's Image url
    image_url = models.TextField()