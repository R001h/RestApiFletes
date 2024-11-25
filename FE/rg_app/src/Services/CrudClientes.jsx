// src/services/usersService.js

// Función para crear un nuevo cliente (POST)
async function postClientes(newCliente) {
    try {
        const response = await fetch("http://localhost:3001/clientes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCliente)
        });

        if (!response.ok) {
            throw new Error('Error al crear el cliente');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        throw error;
    }
}

// Función para obtener todos los clientes (GET)
async function getClientes() {
    try {
        const response = await fetch("http://localhost:3001/clientes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener los clientes');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        throw error;
    }
}

export { postClientes, getClientes };
