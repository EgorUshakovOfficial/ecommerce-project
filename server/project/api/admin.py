from django.contrib import admin

from .models.CartItem import CartItem
from .models.Discount import Discount
from .models.GiftCard import GiftCard
from .models.OrderDetails import OrderDetails
from .models.OrderItem import OrderItem
from .models.PaymentDetails import PaymentDetails
from .models.Product import Product
from .models.ProductImage import ProductImage
from .models.Review import Review
from .models.User import User
from .models.UserAddress import UserAddress

# Cart Item
admin.site.register(CartItem)

# Discount
admin.site.register(Discount)

# Gift Card
admin.site.register(GiftCard)

# Order Details
admin.site.register(OrderDetails)

# Order Item
admin.site.register(OrderItem)

# Payment Details
admin.site.register(PaymentDetails)

# Product
admin.site.register(Product)

# Product Image
admin.site.register(ProductImage)

# Review
admin.site.register(Review)

# User
admin.site.register(User)

# User Address
admin.site.register(UserAddress)






