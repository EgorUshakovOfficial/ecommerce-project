from apps.api.config.stripe import StripeSingleton

# Stripe instance
stripe = StripeSingleton.get_instance()

class PaymentCard:
    def __init__(
                self,
                card_number,
                cardholder,
                expiration_date,
                security_code):

        # 16 digit debit or credit card number
        self.card_number = card_number

        # Card holder name
        self.cardholder = cardholder

        # Extract month and year values from expiration date
        month, year = self.get_month_year(expiration_date)

        # Expiration month
        self.month = month

        # Expiration year
        self.year = year

        # CSV code
        self.security_code = security_code

    # Converts expiration date in mm/yy format to integer month and year values
    def get_month_year(self, expiration_date):
        # Split the input string by the "/" operator
        month, year = expiration_date.split("/")

        # Converts month into integer value
        month = int(month)

        # Converts year into integer value
        year = 2000 + int(year)

        return month, year

    # Creates payment method for card details
    def create_payment_method(self):
        try:
            # Creates a payment method with card details
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

        except stripe.error.CardError as e:
            # Handles card error
            raise e

        except Exception as e:
            # Handles general error
            return e

    # Process payment
    def process_payment(self, subtotal, shipping_cost):
        try:
            # Creates payment method id from the card details
            payment_method = self.create_payment_method()

            # Amount owed in pennies
            amount = self.calculate_total(subtotal, shipping_cost)

            # Creates a charge with payment method id and amount
            charge = stripe.PaymentIntent.create(
                amount=amount,
                currency="cad",
                payment_method=payment_method["id"],
                confirm=True
            )

            return charge

        except stripe.error.CardError as e:
            raise e

        except Exception as e:
            raise e

    # Calculates total amount
    def calculate_total(self, subtotal, shipping_cost):
        amount = subtotal + shipping_cost

        # Rounds amount to two decimal places
        amount = round(amount, 2)

        # Convert amount to pennies
        amount_in_pennies = int(amount*100)

        return amount_in_pennies












