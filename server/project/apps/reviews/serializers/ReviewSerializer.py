from rest_framework import serializers

# Models
from ..models import Review

# Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        # Review model
        model = Review

        # All fields
        fields = '__all__'

        # Extra keyword arguments
        extra_kwargs = {
            'product': {'write_only': True},
            'user': {'write_only':True},
        }
