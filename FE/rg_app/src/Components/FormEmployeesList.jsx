import React, { useState } from 'react';
import '../Style/EmployeesList.css'

function FormEmployeesList() {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    position: '',
    phone: '',
    email: '',
    address: '',
    salary: '',
    department: '',
    hireDate: ''
  });

  const [error, setError] = useState(null); // Estado para manejar errores
  const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga

  // Maneja el cambio de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de campos
    if (!employeeData.name || !employeeData.phone || !employeeData.email || !employeeData.position || !employeeData.department) {
      setError('Todos los campos obligatorios deben ser llenados');
      return;
    }

    setLoading(true);
    setError(null); // Limpiar errores previos

    try {
      // Aquí va el llamado a la API para registrar el empleado (puedes usar fetch o axios)
      const response = await fetch('http://127.0.0.1:8000/api/employees/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access_token")}` // Agregar token de autenticación
        },
        body: JSON.stringify(employeeData)
      });

      if (!response.ok) {
        throw new Error('Error al registrar el empleado');
      }

      const data = await response.json();
      console.log('Empleado registrado:', data);
      // Aquí podrías redirigir a otra página o mostrar un mensaje de éxito
      alert('Empleado registrado con éxito');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message); // Mostrar el error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Registro de Empleado</h1>
      {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
      <form onSubmit={handleSubmit} className="employee-form">
        <label>Nombre:
          <input type="text" name="name" value={employeeData.name} onChange={handleChange} required />
        </label>
        <label>Posición:
          <select name="position" value={employeeData.position} onChange={handleChange} required>
            <option value="">Seleccione una opción</option>
            <option value="driver">Conductor</option>
            <option value="manager">Gerente</option>
            <option value="assistant">Asistente</option>
          </select>
        </label>
        <label>Teléfono:
          <input type="text" name="phone" value={employeeData.phone} onChange={handleChange} required />
        </label>
        <label>Correo Electrónico:
          <input type="email" name="email" value={employeeData.email} onChange={handleChange} required />
        </label>
        <label>Dirección:
          <input type="text" name="address" value={employeeData.address} onChange={handleChange} />
        </label>
        <label>Salario:
          <input type="number" step="0.01" name="salary" value={employeeData.salary} onChange={handleChange} />
        </label>
        <label>Departamento:
          <select name="department" value={employeeData.department} onChange={handleChange} required>
            <option value="">Seleccione una opción</option>
            <option value="HR">Recursos Humanos</option>
            <option value="Operations">Operaciones</option>
            <option value="Sales">Ventas</option>
            <option value="Logistics">Logística</option>
          </select>
        </label>
        <label>Fecha de Contratación:
          <input type="date" name="hireDate" value={employeeData.hireDate} onChange={handleChange} />
        </label>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Empleado'}
        </button>
      </form>
    </div>
  );
}

export default FormEmployeesList;
