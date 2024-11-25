import React, { useState } from 'react'; 
import '../Style/FormRegister.css'; // Importamos los estilos CSS específicos para el formulario de registro.
import Swal from 'sweetalert2'; // Para mostrar alertas con estilo.
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario después del registro.
import { RegisterUser } from './Services/RegisterUser'; // Asegúrate de tener la ruta correcta.



function FormRegister() {
  const [Nombre, setNombre] = useState(''); 
  const [Apellido, setApellido] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [FechaNacimiento, setFechaNacimiento] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!Nombre || !Apellido || !Correo || !Contraseña || !Telefono || !Direccion || !FechaNacimiento) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, llena todos los campos.',
      });
      return;
    }

    // Aquí puedes agregar la lógica para guardar al usuario en tu backend.
    Swal.fire({
      icon: 'success',
      title: 'Registro Exitoso!',
      text: 'Ahora puedes iniciar sesión.',
    });
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-box animated">
        <h2 className="register-title">Registrarse</h2>
        
        <div className="register-input-container">
          <label className="register-label" htmlFor="name">Nombre</label>
          <input
            className="register-input animated-input"
            type="text"
            id="name"
            placeholder="Ingrese su nombre"
            value={Nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        
        <div className="register-input-container">
          <label className="register-label" htmlFor="lastname">Apellido</label>
          <input
            className="register-input animated-input"
            type="text"
            id="lastname"
            placeholder="Ingrese su apellido"
            value={Apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>

        <div className="register-input-container">
          <label className="register-label" htmlFor="email">Correo</label>
          <input
            className="register-input animated-input"
            type="email"
            id="email"
            placeholder="Ingrese su correo"
            value={Correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="register-input-container">
          <label className="register-label" htmlFor="password">Contraseña</label>
          <input
            className="register-input animated-input"
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            value={Contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>

        <div className="register-input-container">
          <label className="register-label" htmlFor="phone">Teléfono</label>
          <input
            className="register-input animated-input"
            type="tel"
            id="phone"
            placeholder="Ingrese su número de teléfono"
            value={Telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>

        <div className="register-input-container">
          <label className="register-label" htmlFor="address">Dirección</label>
          <input
            className="register-input animated-input"
            type="text"
            id="address"
            placeholder="Ingrese su dirección"
            value={Direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>

        <div className="register-input-container">
          <label className="register-label" htmlFor="birthdate">Fecha de Nacimiento</label>
          <input
            className="register-input animated-input"
            type="date"
            id="birthdate"
            value={FechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>

        <button className="register-button animated-button" onClick={handleRegister}>
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default FormRegister;
