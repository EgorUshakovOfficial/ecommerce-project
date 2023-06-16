from rest_framework import serializers

# Models
from apps.shopping.models import ShoppingSession

# Shopping session serializer
class ShoppingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingSession
        fields = ['id', 'user', 'total', 'created_at', 'modified_at']
        extra_kwargs = {'user': {'write_only': True}}

    # Deletes the shopping session from the database
    # Args:
    #   shopping_session_id: Shopping session Id number
    # Return:
    #   None
    def destroy(self, shopping_session_id):
        try:
            instance = ShoppingSession.objects.get(id=shopping_session_id)
            instance.delete()
        except ShoppingSession.DoesNotExist:
            return None

    def __str__(self):
        return 'Shopping Session'
