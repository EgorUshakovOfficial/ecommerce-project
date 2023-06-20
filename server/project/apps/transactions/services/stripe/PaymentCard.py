from apps.transactions.config.stripe import StripeSingleton

# Stripe instance
stripe = StripeSingleton.get_instance()

# Utilities
from utils.calculate_total import calculate_total

class PaymentCard:
    def __init__(self, **kwargs):
        # 16 digit debit or credit card number
        self.card_number = kwargs.get('card_number')

        # Card holder name
        self.cardholder = kwargs.get('cardholder')

        # Expiration date (mm/yy)
        expiration_date = kwargs.get('expiration_date')

        # Extract month and year values from expiration date
        month, year = self.get_month_year(expiration_date)

        # Expiration month
        self.month = month

        # Expiration year
        self.year = year

        # CSV code
        self.security_code = kwargs.get('security_code')

    # Converts expiration date in mm/yy format to integer month and year values
    # Args:
    #   expiration: Expiration date string in mm/yy format
    # Return
    #   Month and the last two digits of the year values
    def get_month_year(self, expiration_date):
        # Split the input string by the "/" operator
        month, year = expiration_date.split("/")

        # Converts month into integer value
        month = int(month)

        # Converts year into integer value
        year = 2000 + int(year)

        return month, year

    # Creates a card payment method
    # Args:
    #   No arguments
    # Return
    #   Payment method object or it raises error
    def create_payment_method(self):
        # Attempts to initialize payment method for the specified card
        try:
            # Initialize payment method
            payment_method = stripe.PaymentMethod.create(
                type='card',
                card={
                    'number':self.card_number,
                    'exp_month':self.month,
                    'exp_year':self.year,
                    'cvc': self.security_code
                }
            )

            return payment_method

        # Handles any error pertaining to payment method creation
        except Exception as e:
            raise e

    # Charges card using the Stripe API
    # Args:
    #   card: Payment method object
    #   subtotal: Amount owed for cart items
    #   total: Sum of subtotal and shipping cost
    # Return
    #   Charge or Error object
    def charge(self, **kwargs):
        # Retrieve subtotal and shipping cost from the keyword arguments
        subtotal = kwargs.get('subtotal')
        shipping_cost = kwargs.get('shipping_cost')

        # Attempt to charge card
        try:
            # Initialize charge object
            charge = self.process_payment(subtotal, shipping_cost)
            return charge

        # Handles any error pertaining to the attempt to charge card
        except Exception as e:
            raise e

    # Processes card payment using the Stripe API
    # Args:
    #   subtotal: Amount owed for the cart items
    #   total:  Sum of subtotal and shipping cost
    # Return:
    #   Charge object or an error is raised
    def process_payment(self, subtotal, shipping_cost):
        # Attempts to process card payment
        try:
            # Creates payment method
            payment_method = self.create_payment_method()

            # Calculates total amount owed in pennies
            total = calculate_total(subtotal, shipping_cost)
            total_in_pennies = int(100*total)

            # Initialize charge
            charge = stripe.PaymentIntent.create(
                amount=total_in_pennies,
                currency="cad",
                payment_method=payment_method["id"],
                confirm=True
            )

            return charge

        # Handles any error pertaining to the attempt of processing payment
        except Exception as e:
            raise e




