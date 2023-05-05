import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Alert} from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImUserTie } from 'react-icons/im';


function RegistroUsuario() {
    const ApiUrl = "http://127.0.0.1:4500"
    const [validated, setValidated] = useState(false);
    let navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [alertClass, setAlertClass] = useState("");
    const [base64String, setBase64String] = useState("");
    let token = localStorage.getItem("token");
  
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

        data.base64 = base64String;
        data.Nombre = event.target.nombre.value;
        data.Apellido = event.target.apellido.value;
        data.Correo = event.target.correo.value;
        data.Contrasena = event.target.contrasena1.value;
        data.Telefono = event.target.telefono.value;
        data.Estado = 0;  
        data.UrlCv = event.target.cv.value;  
        data.TipoLicencia = event.target.licencia.value;  
        data.Vehiculo = event.target.vehiculo.value;  
        data.IdMunicipio = event.target.municipio.value;  
        data.idRol = 2;  
        data.type = 'repartidor';

        let requestOptionsPOST = { 
            method: "POST", 
            headers: { "Content-Type": "application/json",  'Access-Control-Allow-Origin': '*',  'Authorization': `Bearer ${token}`}, 
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
        
                    if (!data.guardado) {
                        ShowMsg('danger','El correo ingresado ya fue registrado anteriormente');
                        return
                    }
        
                    ShowMsg('success','El repartidor se ha creado correctamente');
                    //redireccionar al login
                    setTimeout(() => {return navigate("/login");}, 5000); 
                }

                
            }).catch((err) => {
            console.log(err);
            }) 
        });
    }

    const handleFileChange = (event) => {
        console.log(event)
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const b64S = event.target.result;
            setBase64String(b64S);
        };
        reader.readAsDataURL(file);
    }

    return (
        <Container >
            
            <h2><ImUserTie />Registrar Repartidor</h2>

            {showAlert && (
                <Alert className={`alert alert-${alertClass} alert-dismissible fade show`} onClose={() => setShowAlert(false)} dismissible>
                    {alertText}
                </Alert>
            )}

            <Form noValidate validated={validated} onSubmit={handleSubmitRegister}>
            <Row xs={2} sm={2} md={2} lg={2} className="g-4">
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control id="nombre" type="text" placeholder="Ingresar nombre" tabIndex={2} onKeyDown={soloLetras} onInput={noCaracteres} required autoFocus name='nombre'/>
                        <Form.Control.Feedback type="invalid">Ingrese un nombre</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control id="correo" type="email" placeholder="Ingresar correo" tabIndex={4} required name='correo'/>
                        <Form.Control.Feedback type="invalid">Ingrese un correo válido</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control id='contrasena1' type="password" placeholder="Ingresar contraseña" tabIndex={6} required name='contrasena1'/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Curriculum</Form.Label>
                        <Form.Control id="cv" type="file" tabIndex={8} required name='cv' onChange={handleFileChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>¿Posee vehículo?</Form.Label>
                        <Form.Select id="vehiculo" aria-label="Default select example" tabIndex={10} required name="vehiculo">
                            <option value="si">Si</option>
                            <option value="no">No</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control id="apellido" type="text" placeholder="Ingresar apellido" tabIndex={3} onKeyDown={soloLetras} onInput={noCaracteres} required name="apellido"/>
                        <Form.Control.Feedback type="invalid">Ingrese un apellido</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control id="telefono" type="number" placeholder="Ingresar teléfono" tabIndex={5} onKeyDown={soloNumeros} required name='telefono'/>
                        <Form.Control.Feedback type="invalid">Ingrese un teléfono</Form.Control.Feedback>
                    </Form.Group>
                
                    <Form.Group className="mb-3" >
                        <Form.Label>Confirmar contraseña</Form.Label>
                        <Form.Control id='contrasena2' type="password" placeholder="Confirmar contraseña" tabIndex={7} required name='contrasena2'/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Municipio</Form.Label>
                        <Form.Select id="municipio" aria-label="Default select example" tabIndex={9} required name='municipio'>
                            <option value="1">Guatemala</option>
                            <option value="2">Mixco</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="licencia">
                        <Form.Label>¿Tipo de licencia?</Form.Label>
                        <Form.Select id="licencia" aria-label="Default select example" tabIndex={11} required name='licencia'>
                            <option value="a">A</option>
                            <option value="b">B</option>
                            <option value="c">C</option>
                            <option value="m">M</option>
                        </Form.Select>
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