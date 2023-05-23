from django.contrib import admin

from .models import User, UserAddress

# Register user
admin.site.register(User)

# Register user address
admin.site.register(UserAddress)



