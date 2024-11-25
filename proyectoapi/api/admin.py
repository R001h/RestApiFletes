from django.contrib import admin
from .models import User, Driver, Employee, Client

admin.site.register(User)
admin.site.register(Driver)
admin.site.register(Employee)
admin.site.register(Client)
