async function updateMaterial(id, updatedData) {
    try {
      const response = await fetch(`http://localhost:3001/materiales/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error(`Error updating material with id ${id}`);
      }
  
      return { message: `Material with id ${id} updated successfully` };
    } catch (error) {
      console.error('Error updating material:', error);
      throw error;
    }
  }
  
  export default updateMaterial;
  