from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models
from django.core.validators import RegexValidator
from django.db.models.signals import post_save
from django.dispatch import receiver

# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

# Base User Model
class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        DRIVER = "DRIVER", "Driver"
        EMPLOYEE = "EMPLOYEE", "Employee"
        CLIENT = "CLIENT", "Client"

    # Custom fields
    role = models.CharField(max_length=50, choices=Role.choices, default=Role.ADMIN)
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="The phone number must have 9-15 digits and can include an optional '+'."
    )
    phone_number = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        validators=[phone_regex]
    )

    # Avoiding related_name conflicts
    groups = models.ManyToManyField(
        Group, related_name="custom_user_set", blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission, related_name="custom_user_permissions", blank=True
    )

    objects = UserManager()

    def save(self, *args, **kwargs):
        # Assign a default role on creation
        if not self.pk:
            self.role = self.role or self.Role.ADMIN
        super().save(*args, **kwargs)

# Proxy Models and their Managers
class DriverManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=User.Role.DRIVER)

class Driver(User):
    objects = DriverManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Welcome, Driver!"

class EmployeeManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=User.Role.EMPLOYEE)

class Employee(User):
    objects = EmployeeManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Welcome, Employee!"

class ClientManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=User.Role.CLIENT)

class Client(User):
    objects = ClientManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Welcome, Client!"

# Profile Models
class DriverProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='driver_profile')
    driver_id = models.IntegerField(null=True, blank=True)

class EmployeeProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employee_profile')
    employee_id = models.IntegerField(null=True, blank=True)

class ClientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='client_profile')
    client_id = models.IntegerField(null=True, blank=True)

# Signals to create profiles
@receiver(post_save, sender=Driver)
def create_driver_profile(sender, instance, created, **kwargs):
    if created:
        DriverProfile.objects.create(user=instance)

@receiver(post_save, sender=Employee)
def create_employee_profile(sender, instance, created, **kwargs):
    if created:
        EmployeeProfile.objects.create(user=instance)

@receiver(post_save, sender=Client)
def create_client_profile(sender, instance, created, **kwargs):
    if created:
        ClientProfile.objects.create(user=instance)
