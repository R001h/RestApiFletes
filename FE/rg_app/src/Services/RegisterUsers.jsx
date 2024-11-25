// Crear un nuevo usuario
async function CreateUser(data) {
    try {
        const response = await fetch('http://192.168.1.81:8000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error creando el usuario');
        }

        const createdUser = await response.json();
        console.log('Usuario creado:', createdUser);
        return createdUser;
    } catch (error) {
        console.error('Error creando usuario:', error);
        throw error;
    }
}

// Obtener todos los usuarios
async function GetUsers() {
    try {
        const response = await fetch('http://192.168.1.81:8000/api/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error obteniendo usuarios');
        }

        const users = await response.json();
        console.log('Usuarios obtenidos:', users);
        return users;
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        throw error;
    }
}

// Actualizar un usuario
async function UpdateUser(userId, updatedData) {
    try {
        const response = await fetch(`http://192.168.1.81:8000/api/users/${userId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error actualizando el usuario');
        }

        const updatedUser = await response.json();
        console.log('Usuario actualizado:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        throw error;
    }
}

// Eliminar un usuario
async function DeleteUser(userId) {
    try {
        const response = await fetch(`http://192.168.1.81:8000/api/users/${userId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error eliminando usuario');
        }

        console.log(`Usuario con ID ${userId} eliminado exitosamente`);
        return true;
    } catch (error) {
        console.error('Error eliminando usuario:', error);
        throw error;
    }
}

// Registrar un nuevo usuario (usando la lógica del formulario)
async function RegisterUser(data, navigate) {
    try {
        const user = await CreateUser(data);
        console.log('Usuario registrado:', user);
        Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: 'Ahora puedes iniciar sesión.',
        });
        navigate('/login');
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error al registrarse',
            text: error.message || 'Inténtalo nuevamente.',
        });
    }
}

export { CreateUser, GetUsers, UpdateUser, DeleteUser, RegisterUser };
