import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from '../Pages/Principal'
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Servicios from '../Pages/Servicios';
import Contactos from '../Pages/Contactos';
import Administracion from '../Pages/Administracion';
import ProtectedRoute from './ProtectedRoute';
import Tienda from '../Pages/Tienda';
import EmployeesList from '../Pages/EmployeesList'
import ClientsList from '../Pages/ClientsList'
import Admin from '../Pages/Admin'
import FormConductor from '../Components/FormConductor'

function Routing() {
  return (
    <Router>
    <Routes>
  
      <Route path="/" element={<Principal />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Servicios" element={<Servicios />} />
      <Route path="/Contactos" element={<Contactos />} />
      <Route path="/Tienda" element={<Tienda />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/FormConductor" element={<FormConductor />} />
      <Route path="/Administracion" element={<ProtectedRoute><Administracion /></ProtectedRoute>}/>
      <Route path="/EmployeesList" element={<ProtectedRoute><EmployeesList /></ProtectedRoute>}/>
      <Route path="/ClientsList" element={<ProtectedRoute><ClientsList /></ProtectedRoute>}/>
      
      

    
      

    
     
    
    </Routes>
   </Router>
  )
}

export default Routing;