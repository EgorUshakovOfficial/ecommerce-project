import uuid
from django.db import models

# User
from .Product import Product
from apps.users.models import User

# Product Image
class ProductImage(models.Model):
    # Product Image id
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Product
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    # Product color
    color_name = models.CharField(max_length=20)

    # Main image
    main_image = models.BooleanField(default=False)

    # Product color's hexacode
    hexacode = models.CharField(max_length=6)

    # Product's Image url
    image_url = models.TextField()

    def __str__(self):
        return f'{self.product.title} ({self.color_name})'