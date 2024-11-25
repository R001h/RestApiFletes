from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import DriverListCreate, DriverDetail, EmployeeListCreate, EmployeeDetail, ClientListCreate, ClientDetail, UserListCreate, UserDetail

urlpatterns = [
    # Rutas de autenticación JWT
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Rutas para listar y crear usuarios
    path('users/', UserListCreate.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),

    # Rutas para conductores
    path('drivers/', DriverListCreate.as_view(), name='driver-list-create'),
    path('drivers/<int:pk>/', DriverDetail.as_view(), name='driver-detail'),

    # Rutas para empleados
    path('employees/', EmployeeListCreate.as_view(), name='employee-list-create'),
    path('employees/<int:pk>/', EmployeeDetail.as_view(), name='employee-detail'),

    # Rutas para clientes
    path('clients/', ClientListCreate.as_view(), name='client-list-create'),
    path('clients/<int:pk>/', ClientDetail.as_view(), name='client-detail'),
]
