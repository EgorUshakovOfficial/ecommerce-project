from django.contrib import admin
from django.urls import path, include
from apps import urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.urls'))
]
