from django.contrib import admin

from .models.GiftCard import GiftCard

from .models.PaymentDetails import PaymentDetails

# Register Gift Card
admin.site.register(GiftCard)

# Register Payment Details
admin.site.register(PaymentDetails)

