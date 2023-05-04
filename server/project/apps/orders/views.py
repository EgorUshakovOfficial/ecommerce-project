from stripe.error import CardError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from apps.transactions.services.stripe.PaymentCard import PaymentCard

# Order view
@api_view(['POST'])
def order_view(request):
    # 16 digit debit or credit card number
    card_number = request.data['cardNumber']

    # Name of the card holder
    cardholder = request.data['cardholder']

    # Expiration date
    expiration_date = request.data['expirationDate']

    # CSV code
    security_code = request.data['securityCode']

    # Subtotal
    subtotal = float(request.data['subtotal'])

    # Shipping cost
    shipping_cost = float(request.data['shippingCost'])

    try:
        # Initialize card payment
        payment_card = PaymentCard(card_number, cardholder, expiration_date, security_code)

        # Process payment using the Stripe API
        charge = payment_card.process_payment(subtotal, shipping_cost)

        return Response({"message": "Charge created successfully"}, status=status.HTTP_201_CREATED)

    # Handles any Stripe errors pertaining to card details
    except CardError as e:
        return Response({"error":e.code, "message":e.error.message}, status=status.HTTP_400_BAD_REQUEST)

    # Handles any other errors
    except Exception as e:
        message = e.message if hasattr(e, "message") else e
        return Response({"error":"Internal server error", "message": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
