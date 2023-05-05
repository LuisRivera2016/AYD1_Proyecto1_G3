import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FaUserAlt } from 'react-icons/fa';
import React, { useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";


function Login() {
    const ApiUrl = "http://127.0.0.1:4500"
    const [validated, setValidated] = useState(false);
    let navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [alertClass, setAlertClass] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem('idUsuario');
        if (userId!=null){
            return navigate("/");
        } 

        let timeout;

        if (showAlert) {
            timeout = setTimeout(() => {
            setShowAlert(false);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [showAlert]);

    const ShowMsg = (alertClass, alertText) => {
        setShowAlert(true);
        setAlertClass(alertClass);
        setAlertText(alertText);
    }

    const verifyRol = (token) => {
        const userRole = jwt_decode(token);
    
        const expiracion = userRole.exp;
        /*if (expiracion < Date.now() / 1000) {
          // El token ha expirado se cierra la sesión
          localStorage.clear();
          //this.abrirDialogo("CIERRE DE SESIÓN", "Su sesión ha expirado");
          setTimeout(() => {
            window.location.href = `/login`;
          }, 3000);
        }*/
        //if (userRole.role !== "user") window.location.href = `/access-denied`;

        console.log(userRole.role);
        if (userRole.role == "Usuario") window.location.href = `/categorias`;
        else if (userRole.role === "Empresa") window.location.href = `/registroProductos`;
        else if (userRole.role === "Repartidor") window.location.href = `/perfilRepartidor/:repartidorId`;
        else if (userRole.role === "Administrador") window.location.href = `/admin`;
    };

    const handleSubmitLogin = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        
        if (form.checkValidity() === false) {return}
    
        let errorServidor = false;
        const data = {
            username :event.target.correo.value,
            password:event.target.password.value,
        };
        
        console.log(`${ApiUrl}/login`)
        console.log(data)
    
        let requestOptionsPOST = { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(data),
            credentials: "same-origin",
        }

        fetch(`${ApiUrl}/login`, requestOptionsPOST)
        .then((response) => { 
            return response.json().then((data) => {
                console.log(response);
                console.log(data);

                if (!response.ok) {     
                    if (response.status == 401) {
                        ShowMsg('danger','No esta autorizado para iniciar sesión');
                    } else {
                        ShowMsg('danger','Error inesperado en el servidor'); 
                    }  
    
                    errorServidor = true;
                    return;
                } else {
                    const userRole = jwt_decode(data.token);
                    console.log(userRole);
                    if(userRole.estado == "0") {
                        ShowMsg('info','Su usuario aun no ha sido Aprobado, contacte al administrador'); 
                        return
                    } else if(userRole.estado == "2") {
                        ShowMsg('warning','Su usuario ha sido Rechazado, contacte al administrador'); 
                        return
                    } else if(userRole.estado == "3") {
                        ShowMsg('danger','Su usuario ha sido Deshabilitado, contacte al administrador'); 
                        return
                    }
                    if (userRole.rol == "Usuario") window.location.href = `/categorias`;
                    else if (userRole.rol === "Empresa") window.location.href = `/registroProductos`;
                    else if (userRole.rol === "Repartidor") window.location.href = `/perfilRepartidor/${userRole.id}`;
                    else if (userRole.rol === "Administrador") window.location.href = `/admin`;
            
                    localStorage.setItem('idUsuario', userRole.id);// para usarlos despues
                    localStorage.setItem('email', userRole.email);// para usarlos despues
                    localStorage.setItem('rol', userRole.rol);// para usarlos despues
                    localStorage.setItem("token", data.token)
            
                    if (data.Tipo === 1){
                        //Redirigir a la página de admin
                        //navigate("/registroPelicula");
                        //window.location.reload();
                    } else {
                        //Redirigir a la página de usuario
                        //navigate("/catalogoPeliculas");
                        //window.location.reload();
                    }
                } 
            }).catch((err) => {
            console.log(err);
            }) 
        });   
    };

    return (
        <Container >
            {showAlert && (
                <Alert className={`alert alert-${alertClass} alert-dismissible fade show`} onClose={() => setShowAlert(false)} dismissible>
                    {alertText}
                </Alert>
            )}
            
            <h2><FaUserAlt />Iniciar Sesión</h2>

            <Form noValidate validated={validated} onSubmit={handleSubmitLogin} >
                <Row xs={1} sm={1} md={1} lg={1} className="g-4">
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control id="correo" type="email" placeholder="Ingresar correo" required autoFocus name='correo'/>
                            <Form.Control.Feedback type="invalid">Ingrese un correo válido</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control id="password" type="password" placeholder="Ingresar contraseña" required name='password'/>
                            <Form.Control.Feedback type="invalid">Por favor ingrese su contraseña</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button variant="primary" type="submit">
                            Iniciar sesión
                        </Button>
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col>
                        <Link  to="/registroUsuario" style={{ textDecoration: 'none' }}>
                            <Button variant="link">Registrarse como usuario</Button>
                        </Link >
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Link  to="/registroEmpresa" style={{ textDecoration: 'none' }}>
                            <Button variant="link">Registrarse como empresa</Button>
                        </Link >
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Link  to="/registroRepartidor" style={{ textDecoration: 'none' }}>
                            <Button variant="link">Registrarse como repartidor</Button>
                        </Link >
                    </Col>
                </Row>

            </Form>
        </Container>
    );
}

export default Login;