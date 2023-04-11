import stripe

from django.conf import settings

# Configure stripe settings by setting API secret key
stripe.api_key = settings.STRIPE_SECRET_KEY

print(settings.STRIPE_SECRET_KEY)

class StripeSingleton:
    stripe_instance = None

    @classmethod
    def get_instance(self):
        if not self.stripe_instance:
            self.stripe_instance = stripe

        return self.stripe_instance


