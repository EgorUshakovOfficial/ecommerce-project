from rest_framework import serializers

# Authorization code serializer
class ExchangeCodeSerializer(serializers.Serializer):
    # Authorization code
    code = serializers.CharField(max_length=200)
