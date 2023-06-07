# Create missing field error in cart item
# Args:
#   Error: Error type
#   Message: The reason why the error occurred
# Return
#   Error object
def create_error(error, message):
    error_obj = {'error':error, 'message': message}
    return error_obj
