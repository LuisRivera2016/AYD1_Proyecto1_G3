import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import CarritoCompras from '../CarritoCompras/CarritoCompras';

function Navigation() {

  const [idUsuario] = useState(localStorage.getItem('idUsuario'));
  const [email] = useState(localStorage.getItem('email'));
  const [rol] = useState(localStorage.getItem('rol'));
  const [token] = useState(localStorage.getItem('token'));
  let navigate = useNavigate();

  function Logout() {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  }

  if (idUsuario != null) {
    return(
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">AL Chilazo</Navbar.Brand>
          {
            rol == "Empresa" &&
            <Nav className="me-auto">
              <Nav.Link href="/productosEmpresa">Ver mis Productos</Nav.Link> 
              <Nav.Link href="/registroProductos">Registro de productos</Nav.Link> 
              <Nav.Link href="/panelControl">Editar Productos</Nav.Link>
              <Nav.Link href="/pedidosEmpresa">Pedidos</Nav.Link>
              <Nav.Link href="/reportesEmpresa">Reportes</Nav.Link>
            </Nav>
            
          } 
          {
            rol == "Repartidor" &&  
            <Nav className="me-auto">   
              <Nav.Link href={`/perfilRepartidor/${idUsuario}`}>Repartidor</Nav.Link>
              <Nav.Link href={`/pedidosRepartidor/${idUsuario}`}>Pedidos de repartidor</Nav.Link> 
              <Nav.Link href={`/historialPedidos/${idUsuario}`}>Historial Pedidos Hechos</Nav.Link> 
            </Nav>
            
          }
          {
            rol == "Administrador" && 
            <Nav className="me-auto">
              <Nav.Link href="/solicitudes">Ver y administrar solicitudes</Nav.Link> 
              <Nav.Link href="/deshabilitar">Deshabilitar Usuarios</Nav.Link>               
              <Nav.Link href="/reportesAdmin">Reportes</Nav.Link>
            </Nav>
          }

          {
            rol == "Usuario" && 
            <Nav className="me-auto">
              <Nav.Link href="/categorias">Ver productos</Nav.Link>
              <Nav.Link href="/historialPedidos">Ver historial</Nav.Link>
              <Nav.Link><CarritoCompras/></Nav.Link>
            </Nav>
          }

          {/* Usuario conectado */} 
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="d-flex">
              Bienvenido {email}
            </Navbar.Text>
            <Button variant="outline-light" style={{marginLeft:15}} onClick={Logout}>Cerrar Sesion</Button>
          </Navbar.Collapse>    
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="/">AL Chilazo</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav >
            <Nav.Link href="/login">Iniciar sesión</Nav.Link>
          </Nav>          
        </Navbar.Collapse>   
      </Container>
    </Navbar>

  );
}

export default Navigation;