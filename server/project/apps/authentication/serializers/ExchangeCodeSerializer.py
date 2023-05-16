from rest_framework import serializers

# Authorization code serializer
class ExchangeCodeSerializer(serializers.Serializer):
    # Authorization code
    authorization_code = serializers.CharField(max_length=200)
