async function GetMateriales() {
    try {
        const response = await fetch('http://localhost:3001/materiales', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al Buscar Usuario');
        }

        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error al Buscar Usuario:', error);
        throw error;
    }
}

export  default  GetMateriales ;