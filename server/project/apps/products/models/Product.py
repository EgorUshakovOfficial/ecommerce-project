import uuid
from django.db import models

# Models
from apps.users.models import User

# Product
class Product(models.Model):
    # Product ID number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # User ID number
    user = models.ForeignKey(User, on_delete=models.RESTRICT)

    # Product Title
    title = models.CharField(max_length=100)

    # Product Description
    description = models.TextField()

    # Product quantity
    quantity = models.PositiveIntegerField()

    # Product price
    price = models.DecimalField(max_digits=10, decimal_places=2)

    # Retrieves instance of the product from the database using Id
    # Args:
    #   product_id: Product Id number
    # Return:
    #   product: Instance of the product or None
    def get_product_by_id(self, product_id):
        try:
            product = self.objects.get(id=product_id)
            return product
        except self.DoesNotExist:
            return None

    def __str__(self):
        return self.title
