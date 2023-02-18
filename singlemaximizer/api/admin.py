from django.contrib import admin

# Register your models here.

from .models import Single, Outlet, MessageTemplate, UserProfile

admin.site.register(Single)
admin.site.register(Outlet)
admin.site.register(MessageTemplate)
admin.site.register(UserProfile)