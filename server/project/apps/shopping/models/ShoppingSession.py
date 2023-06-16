import uuid
from django.db import models

# Models
from apps.users.models import User

# Shopping session
class ShoppingSession(models.Model):
    # Shopping session Id number
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # User
    user = models.OneToOneField(User, related_name='user', on_delete=models.CASCADE)

    # Subtotal
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    # Time shopping session is created
    created_at = models.DateField(auto_now=False, auto_now_add=True)

    # Time shopping session is modified
    modified_at = models.DateField(auto_now=True, auto_now_add=False)

    @classmethod
    # Retrieves instance of shopping session using Id
    # Args:
    #   shopping_session_id: Shopping session's Id number
    # Return:
    #   shopping_session: Instance of shopping session or None
    def get_shopping_session_by_id(self, shopping_session_id):
        try:
            shopping_session = self.objects.get(id=shopping_session_id)
            return shopping_session
        except self.DoesNotExist:
            return None

    @classmethod
    # Retrieves instance of shopping session using search filter
    # Args:
    #   search: Search filter
    # Return
    #   Instance of shopping session or None
    def get_shopping_session(self, search):
        try:
            shopping_session = self.objects.get(**search)
            return shopping_session
        except self.DoesNotExist:
            return None
