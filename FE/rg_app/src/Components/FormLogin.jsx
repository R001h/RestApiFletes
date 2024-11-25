import React, { useState, useEffect } from 'react'; // Importamos React, el hook useState para manejar el estado y useEffect para manejar efectos secundarios.
import '../Style/FormLogin.css'; // Importamos los estilos CSS específicos para el formulario de inicio de sesión.
import iziToast from 'izitoast'; // Importamos iziToast para mostrar alertas con estilo.
import 'izitoast/dist/css/iziToast.min.css'; // Importamos el CSS de iziToast.
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir al usuario a otra ruta.
import { LoginUsers } from '../Services/LoginUsers'; // Importamos el servicio para obtener los usuarios de la base de datos.

function FormLogin() {
  const [Correo, setCorreo] = useState(''); // Estado para almacenar el correo ingresado por el usuario.
  const [Contraseña, setContraseña] = useState(''); // Estado para almacenar la contraseña ingresada por el usuario.
  const navigate = useNavigate(); // Hook para navegar a otras rutas después de un evento (por ejemplo, iniciar sesión correctamente).

  // Función para actualizar el estado `Correo` cuando el usuario escribe en el input de correo.
  const cargaCorreo = (event) => {
    setCorreo(event.target.value); // Actualiza el estado `Correo` con el valor del input.
  };

  // Función para actualizar el estado `Contraseña` cuando el usuario escribe en el input de contraseña.
  const cargaContra = (event) => {
    setContraseña(event.target.value); // Actualiza el estado `Contraseña` con el valor del input.
  };

  // Función que se ejecuta cuando el usuario hace clic en el botón "Iniciar".
  const cargar = async () => {
    console.log('Correo:', Correo); // Imprimimos el correo ingresado (para depuración).
    console.log('Contraseña:', Contraseña); // Imprimimos la contraseña ingresada (para depuración).

    // Verificamos si el correo o la contraseña están vacíos. Si es así, mostramos una alerta de error.
    if (!Correo || !Contraseña) {
      iziToast.error({
        title: 'Error',
        message: 'No llenaste todos los espacios!',
        position: 'topRight',
      });
      return;
    }

    const username = Correo;

    console.log(username, Contraseña);

    const valida = await LoginUsers(username, Contraseña);

    console.log(valida.access);

    if (valida.access) {
      iziToast.success({
        title: 'Ingreso Exitoso!',
        message: 'Bienvenido a la página de administración!',
        position: 'topRight',
      });
      navigate('/Administracion');
      localStorage.setItem('Autenticado', 'true');
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Correo o Contraseña inválidos!',
        position: 'topRight',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box animated">
        <h2 className="login-title">Iniciar Sesión</h2>
        <div className="login-input-container">
          <label className="login-label" htmlFor="username">Usuario</label>
          <input
            className="login-input animated-input"
            type="text"
            id="username"
            name="username"
            placeholder="Ingrese su Correo"
            value={Correo}
            onChange={cargaCorreo}
            required
          />
        </div>
        <div className="login-input-container">
          <label className="login-label" htmlFor="password">Contraseña</label>
          <input
            className="login-input animated-input"
            type="password"
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={Contraseña}
            onChange={cargaContra}
            required
          />
        </div>
        <button className="login-button animated-button" onClick={cargar}>Iniciar</button>
      </div>
    </div>
  );
}

export default FormLogin;
