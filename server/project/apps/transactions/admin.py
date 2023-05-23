from django.contrib import admin

from .models import PaymentDetails, GiftCard

# Register Gift Card
admin.site.register(GiftCard)

# Register Payment Details
admin.site.register(PaymentDetails)

