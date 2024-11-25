from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Driver, Employee, Client
from .models import DriverProfile, EmployeeProfile, ClientProfile

@receiver(post_save, sender=Driver)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "DRIVER":
        DriverProfile.objects.create(user=instance)

@receiver(post_save, sender=Employee)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "EMPLOYEE":
        EmployeeProfile.objects.create(user=instance)

@receiver(post_save, sender=Client)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "CLIENT":
        ClientProfile.objects.create(user=instance)
