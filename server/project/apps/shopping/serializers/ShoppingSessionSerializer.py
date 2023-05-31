from rest_framework import serializers

# Models
from apps.shopping.models import ShoppingSession


# Shopping session serializer
class ShoppingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingSession
        fields = ['id', 'subtotal', 'user']
        extra_kwargs = {"user":{"write_only":True}}

    def destroy(self, shopping_session_id):
        # Retrieve instance of shopping session from the database using Id
        instance = ShoppingSession.objects.filter(id=shopping_session_id)

        instance.destroy()
