import React, { useState } from 'react';
import'../Style/FormAdmin.css'

function FormAdmin() {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <AsignarTarea />
    </div>
  );
}

function AsignarTarea() {
  const [tarea, setTarea] = useState('');
  const [empleado, setEmpleado] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [prioridad, setPrioridad] = useState('Media');

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log('Tarea Asignada:', { tarea, empleado, fechaLimite, prioridad });
    alert('¡Tarea asignada con éxito!');
    setTarea('');
    setEmpleado('');
    setFechaLimite('');
    setPrioridad('Media');
  };

  return (
    <div className="contenedor-tarea">
      <h2 className="encabezado-tarea">Asignar Tarea a un Empleado</h2>
      <form className="formulario-tarea" onSubmit={manejarEnvio}>
        <div className="grupo-formulario">
          <label>Nombre de la Tarea:</label>
          <input
            type="text"
            value={tarea}
            onChange={(e) => setTarea(e.target.value)}
            required
          />
        </div>

        <div className="grupo-formulario">
          <label>Asignar a Empleado:</label>
          <input
            type="text"
            value={empleado}
            onChange={(e) => setEmpleado(e.target.value)}
            required
          />
        </div>

        <div className="grupo-formulario">
          <label>Fecha Límite:</label>
          <input
            type="date"
            value={fechaLimite}
            onChange={(e) => setFechaLimite(e.target.value)}
            required
          />
        </div>

        <div className="grupo-formulario">
          <label>Prioridad:</label>
          <select
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
            required
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        <button type="submit" className="boton-tarea">Asignar Tarea</button>
      </form>
    </div>
  );
}

export default FormAdmin;
