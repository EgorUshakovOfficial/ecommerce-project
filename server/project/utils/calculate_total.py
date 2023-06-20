# Calculates the total amount owed in pennies
# Args:
#   subtotal: Amount owed for the cart items
#   total: Sum of subtotal and shipping cost
# Return:
#   amount_in_pennies: Total amount owed in pennies
def calculate_total(subtotal, shipping_cost):
    # Initialize total amount owed
    total_amount = subtotal + shipping_cost

    # Rounds amount to two decimal places
    total_amount = round(total_amount, 2)

    return total_amount