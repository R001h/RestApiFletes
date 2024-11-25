async function deleteMaterial(id) {
    try {
      const response = await fetch(`http://localhost:3001/materiales/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error deleting material with id ${id}`);
      }
  
      return { message: `Material with id ${id} deleted successfully` };
    } catch (error) {
      console.error('Error deleting material:', error);
      throw error;
    }
  }
  
  export default deleteMaterial;
  