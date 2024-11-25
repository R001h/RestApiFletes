from rest_framework.permissions import BasePermission
from .models import User

class IsAdmin(BasePermission):
    # Permission for checking if the user is an "Admin"
    def has_permission(self, request, view):
        return request.user and request.user.role == User.Role.ADMIN

class IsDriver(BasePermission):
    # Permission for checking if the user is a "Driver"
    def has_permission(self, request, view):
        return request.user and request.user.role == User.Role.DRIVER

class IsEmployee(BasePermission):
    # Permission for checking if the user is an "Employee"
    def has_permission(self, request, view):
        return request.user and request.user.role == User.Role.EMPLOYEE

class IsClient(BasePermission):
    # Permission for checking if the user is a "Client"
    def has_permission(self, request, view):
        return request.user and request.user.role == User.Role.CLIENT
