from stripe.error import CardError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.transactions.services.stripe.PaymentCard import PaymentCard

# Order Detail
class OrderDetail(APIView):
    # Creates payment card
    def create_card(self, card_number, card_holder, expiration_date, csv):
        # Initialize card payment method
        payment_card = PaymentCard(card_number, card_holder, expiration_date, csv)

        return payment_card

    # Charge card
    def charge_card(self, card, subtotal, shipping_cost):
        # Attempts to process card payment
        try:
            # Processes card payment
            charge = card.process_payment(subtotal, shipping_cost)

            return charge

        # Handles any error pertaining to card payment
        except Exception as e:
            raise e

    # POST method
    def post(self, request):
        # 16 digit debit or credit card number
        card_number = request.data['cardNumber']

        # Name of the card holder
        card_holder = request.data['cardholder']

        # Expiration date
        expiration_date = request.data['expirationDate']

        # CSV code
        csv = request.data['securityCode']

        # Subtotal
        subtotal = float(request.data['subtotal'])

        # Shipping cost
        shipping_cost = float(request.data['shippingCost'])

        # Instance of payment card
        payment_card = self.create_card(card_number, card_holder, expiration_date, csv)

        # Attempt to charge payment card
        try:
            self.charge_card(payment_card, subtotal, shipping_cost)

            # Payment card has been successfully charged
            return Response({"message":"Charge created successfully"}, status=status.HTTP_201_CREATED)

        # Handles any errors pertaining to the details of the payment card
        except CardError as e:
            return Response({"error":e.code, "message":e.error.message}, status=status.HTTP_400_BAD_REQUEST)

        # Handles any other errors
        except Exception as e:
            message = e.message if hasattr(e, "message") else e

            return Response({"error":"Internal server error", "message":message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Order view
order_view = OrderDetail.as_view()
