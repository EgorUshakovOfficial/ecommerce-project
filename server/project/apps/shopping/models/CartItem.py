import uuid
from django.db import models

# Models
from apps.products.models import Product
from .ShoppingSession import ShoppingSession

class CartItem(models.Model):
    # Cart item's Id number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Shopping session
    shopping_session = models.ForeignKey(ShoppingSession, related_name="shopping_session", on_delete=models.CASCADE)

    # Product
    product = models.OneToOneField(Product, related_name="product", on_delete=models.CASCADE)

    # Cart Item's quantity
    quantity = models.PositiveIntegerField()

    # Time cart item is created
    created_at = models.DateField(auto_now=False, auto_now_add=True)

    # Time cart item is modified
    modified_at = models.DateField(auto_now=True, auto_now_add=False)

    # # Gets cart item from the database using Id
    # # Args:
    # #   cart_item_id: Cart item Id number
    # # Return
    # #   Instance of cart item or None
    # def get_cart_item_by_id(self, cart_item_id):
    #     try:
    #         cart_item = self.objects.get(id=cart_item_id)
    #         return cart_item
    #     except self.DoesNotExist:
    #         return None

