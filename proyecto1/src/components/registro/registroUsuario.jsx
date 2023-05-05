import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Alert} from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './registro.css';

function RegistroUsuario() {
    const ApiUrl = "http://127.0.0.1:4500"
    const [validated, setValidated] = useState(false);
    let navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [alertClass, setAlertClass] = useState("");
  
    useEffect(() => {
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

    function soloLetras(event) {
        const pattern = /^[a-zA-Z]+$/;
        const inputChar = event.key;
        
        if (!pattern.test(inputChar)) {
          event.preventDefault();
        }
    }
    
    function soloNumeros(event) {
        const pattern = /^[0-9]+$/;
        const inputChar = event.key;
        
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    function noCaracteres(event) {
        event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
    }

    const handleSubmitRegister = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        event.stopPropagation();
        setValidated(true);
        
        if (form.checkValidity() === false) {
            ShowMsg('danger',"Llene todos los datos, no puede dejar campos vacios");
            return
        }

        if(event.target.contrasena1.value !== event.target.contrasena2.value){
            ShowMsg('danger',"La contraseña y la confirmacion no coinciden.");
            return
        }

        let errorServidor = false;
        let data = {}

        data.Nombre = event.target.nombre.value;
        data.Apellido = event.target.apellido.value;
        data.Correo = event.target.correo.value;
        data.Contrasena = event.target.contrasena1.value;
        data.Telefono = event.target.telefono.value;
        data.Estado = 1; // A los usuarios no hay que aprobarlos   
        data.UrlCv = "N/A";  
        data.TipoLicencia = "N/A";  
        data.Vehiculo = "N/A";  
        data.IdMunicipio = 1;  
        data.idRol = 1;  

        let requestOptionsPOST = { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(data),
            credentials: "same-origin",
        }

        fetch(`${ApiUrl}/register`, requestOptionsPOST)
        .then((response) => { 
            return response.json().then((data) => {
                console.log(response);
                console.log(data);

                if (!response.ok) {     
                    if (response.status == 401) {
                        ShowMsg('danger','No esta autorizado a registrar usuarios');
                    } else {
                        ShowMsg('danger','Error inesperado en el servidor'); 
                    }  
    
                    errorServidor = true;
                    return;
                } else {
                    if (!data.guardado) {
                        ShowMsg('danger','El correo ingresado ya fue registrado anteriormente');
                        return
                    }
        
                    ShowMsg('success','El usuario se ha creado correctamente');
                    setTimeout(() => {return navigate("/login");}, 5000); 
                }

                
            }).catch((err) => {
            console.log(err);
            }) 
        });
    }

    return (
    <Container >
        
        <h2><AiOutlineUser />Registrar Usuario</h2>

        {showAlert && (
            <Alert className={`alert alert-${alertClass} alert-dismissible fade show`} onClose={() => setShowAlert(false)} dismissible>
                {alertText}
            </Alert>
        )}

        <Form noValidate validated={validated} onSubmit={handleSubmitRegister} >
        <Row xs={2} sm={2} md={2} lg={2} className="g-4">
            <Col>
                <Form.Group className="mb-3 registro-input">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" id="nombre" placeholder="Ingresar nombre" tabIndex={2} onKeyDown={soloLetras} onInput={noCaracteres} required autoFocus name='nombre'/>
                    <Form.Control.Feedback type="invalid">Ingrese un nombre</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 registro-input">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" id ="correo" placeholder="Ingresar correo" tabIndex={4} required name='correo'/>
                    <Form.Control.Feedback type="invalid">Ingrese un correo válido</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 registro-input">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" id='contrasena1' placeholder="Ingresar contraseña" tabIndex={6} required name='contrasena1'/>
                    <Form.Control.Feedback type="invalid">Ingrese una contraseña</Form.Control.Feedback>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3 registro-input">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" id="apellido" placeholder="Ingresar apellido" tabIndex={3} onKeyDown={soloLetras} onInput={noCaracteres} required name='apellido'/>
                    <Form.Control.Feedback type="invalid">Ingrese un apellido</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 registro-input">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="text" id='telefono' placeholder="Ingresar teléfono" tabIndex={5} onKeyDown={soloNumeros} /*onInput={noCaracteres}*/ required name='telefono'/>
                    <Form.Control.Feedback type="invalid">Ingrese un teléfono</Form.Control.Feedback>
                </Form.Group>
            
                <Form.Group className="mb-3 registro-input">
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Control type="password" id='contrasena2' placeholder="Confirmar contraseña" tabIndex={7} required name='contrasena2'/>
                    <Form.Control.Feedback type="invalid">Confirme la contraseña</Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Button variant="primary" type="submit">
                    Registrarse
                </Button>
            </Col>
        </Row>

        </Form>
    </Container>
  );
}

export default RegistroUsuario;