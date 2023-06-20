import random

# Generates an order number for Order Details
# Args: None
# Return:
#   order_number: 8 digit number
def generate_order_number():
    # Random number between 1 and 9
    order_number = str(random.randint(1, 9))

    # Remaining 7 digits
    order_number += ''.join(random.choice('0123456789') for _ in range(7))

    return order_number
