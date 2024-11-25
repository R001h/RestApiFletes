import React, { useState, useEffect } from 'react'; // Importamos React y los hooks useState y useEffect
import '../Style/FormPrincipal.css'; // Importamos el archivo de estilos
import { Link } from 'react-router-dom'; // Importamos Link para navegar entre rutas
import { useNavigate } from 'react-router-dom'; // useNavigate nos permite navegar entre rutas programáticamente
//import PostListadeMateriales from '../Services/PostListadeMateriales'; // Importamos el servicio para agregar un material
//import GetMateriales from '../Services/GetMateriales'; // Importamos el servicio para obtener los materiales
//import deleteMaterial from '../Services/DeleteMaterial'; // Importamos el servicio para eliminar un material
//import updateMaterial from '../Services/UpdateMaterial.jsx'; // Importamos el servicio para actualizar un material
//import Swal from 'sweetalert2'; // Importamos SweetAlert2 para mostrar mensajes emergentes

function FormAdmi() { // Definimos el componente funcional FormAdmi
  const navigate = useNavigate(); // useNavigate permite redireccionar a otras rutas

  // Definimos los estados del componente para manejar la información
  const [base64Image, setBase64Image] = useState(''); // Estado para la imagen en base64
  const [Nombre, setNombre] = useState(''); // Estado para el nombre del material
  const [Descripcion, setDescripcion] = useState(''); // Estado para la descripción del material
  const [Materiales, setMateriales] = useState([]); // Estado que contiene la lista de materiales
  const [error, setError] = useState(null); // Estado para manejar errores
  const [selectedMaterialId, setSelectedMaterialId] = useState(null); // Estado para manejar el ID del material seleccionado para edición

  // Funciones para cargar valores a los estados
  const CargarNombre = (event) => setNombre(event.target.value); // Actualiza el estado del nombre
  const CargarDescripcion = (event) => setDescripcion(event.target.value); // Actualiza el estado de la descripción
  const Cargar = () => navigate('/Login'); // Redirecciona a la página de Login

  // Convierte la imagen seleccionada en base64
  const convertiraBase64 = (archivos) => {
    Array.from(archivos).forEach((archivo) => {
      const reader = new FileReader(); // Utilizamos FileReader para leer el archivo
      reader.readAsDataURL(archivo); // Leemos el archivo como URL base64
      reader.onload = () => setBase64Image(reader.result); // Guardamos la imagen en base64 en el estado
    });
  };

  // Función para agregar o actualizar un material
  const Agregar = async () => {
    try {
      if (selectedMaterialId) {
        // Si hay un material seleccionado, lo actualizamos
        await updateMaterial(selectedMaterialId, { Img: base64Image, Nombre, Descripcion });
        setSelectedMaterialId(null); // Limpiamos la selección de material
      } else {
        // Si no hay material seleccionado, agregamos uno nuevo
        //await PostListadeMateriales(base64Image, Nombre, Descripcion);
      }
      await fetchMateriales(); // Actualizamos la lista de materiales
    } catch (error) {
      console.error('Error al agregar/editar el material:', error); // Mostramos el error en la consola
    }
  };

  // Función para obtener la lista de materiales desde la API
  const fetchMateriales = async () => {
    try {
      const data = await GetMateriales(); // Llamamos al servicio para obtener los materiales
      setMateriales(data); // Actualizamos el estado con los materiales obtenidos
    } catch (error) {
      setError('Error al obtener materiales.'); // Si hay un error, lo almacenamos en el estado
    }
  };

  // Función para manejar la edición de un material
  const handleEdit = (material) => {
    // Mostramos una alerta de confirmación para editar el material
    Swal.fire({
      title: '¿Editar Material?',
      text: `Estás a punto de editar "${material.Nombre}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Si se confirma, cargamos los valores del material seleccionado en el formulario
        setSelectedMaterialId(material.id); // Guardamos el ID del material a editar
        setNombre(material.Nombre); // Cargamos el nombre
        setDescripcion(material.Descripcion); // Cargamos la descripción
        setBase64Image(material.Img); // Cargamos la imagen en base64
      }
    });
  };

  // Función para eliminar un material
  const handleDelete = async (id) => {
    const materialToDelete = Materiales.find((m) => m.id === id); // Encontramos el material que se desea eliminar
    // Mostramos una alerta de confirmación para eliminar el material
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar "${materialToDelete.Nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMaterial(id); // Llamamos al servicio para eliminar el material
          await fetchMateriales(); // Actualizamos la lista de materiales
          Swal.fire('¡Eliminado!', `${materialToDelete.Nombre} ha sido eliminado.`, 'success'); // Mostramos un mensaje de éxito
        } catch (error) {
          console.error('Error al eliminar el material:', error); // Mostramos el error en la consola
        }
      }
    });
  };

  // useEffect se ejecuta cuando el componente se monta, llamamos a fetchMateriales
  useEffect(() => {
    fetchMateriales();
  }, []);

  return (
    <div className="main-container">
      {/* Formulario para agregar/editar un material */}
      <div className="input">
        <div>
          <input
            placeholder="Ingrese el Nombre de la imagen"
            required
            type="text"
            value={Nombre}
            onChange={CargarNombre} // Se ejecuta cuando se cambia el valor del input de nombre
          />
        </div>
        <div>
          <input
            placeholder="Escriba la descripción"
            required
            type="text"
            value={Descripcion}
            onChange={CargarDescripcion} // Se ejecuta cuando se cambia el valor del input de descripción
          />
          <div>   
            <input required type="file" multiple onChange={(e) => convertiraBase64(e.target.files)} /> {/* Input para subir archivos */}
            
          </div>
          
        </div>
        <div>
          <button onClick={Agregar}> {/* Botón para agregar o editar el material */}
            {selectedMaterialId ? 'Editar Viaje ' : 'Agregar'}
          </button>
        </div>
      </div>

      {/* Mostrar la lista de materiales */}
      <div className="materiales-container">
        <h2>Lista de  Viajes</h2>
        {error ? (
          <p className="error">{error}</p> // Muestra el error si existe
        ) : (
          Materiales.length > 0 ? (
            <div className="materiales-list">
              {Materiales.map((material, index) => (
                <div key={index} className="material-card"> {/* Muestra cada material en la lista */}
                  <img src={material.Img} alt={material.Nombre} style={{ width: '200px' }} className="material-img" /> {/* Imagen del material */}
                  <h3>{material.Nombre}</h3> {/* Nombre del material */}
                  <p>{material.Descripcion}</p> {/* Descripción del material */}
                  <div className="button-container">
                    <div>
                      <button onClick={() => handleEdit(material)} className="btn-edit">Editar</button> {/* Botón para editar */}
                    </div>

                    <div>
                      <button onClick={() => handleDelete(material.id)} className="btn-delete" style={{ backgroundColor: 'red', color: 'white' }}>Eliminar</button> {/* Botón para eliminar */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay Viajes disponibles</p> // Muestra un mensaje si no hay materiales
          )
        )}
      </div>
    </div>
  );
}

export default FormAdmi; // Exportamos el componente para que pueda ser usado en otros archivos

