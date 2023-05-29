from apps.users.models import User

class UserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response


    def __call__(self, request):
        if request.path == "/api/users/google/me":
            print('Middleware is executed...')

        response = self.get_response(request)

        return response
