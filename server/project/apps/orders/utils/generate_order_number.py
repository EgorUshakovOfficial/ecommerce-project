import random

# Generates an order number for Order Details
# Args: None
# Return:
#   order_number: 8 digit number
def generate_order_number():
    # Random number between 1 and 9
    order_number = str(random.randint(1, 9))

    # Remaining 7 digits
    order_number += ''.join(random.choices('0123456789'), k=7)

    return order_number
