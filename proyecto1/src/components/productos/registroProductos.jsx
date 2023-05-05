import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Alert} from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdFastfood } from 'react-icons/md';


function RegistroEmpresa() {
    const ApiUrl = "http://127.0.0.1:4500"
    const [categorias, setCategorias] = useState([]);
    const [validated, setValidated] = useState(false);
    let navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [alertClass, setAlertClass] = useState("");
    let token = localStorage.getItem("token");

    useEffect(() => {
        let requestOptionsGET = { 
            method: "GET", 
            headers: { "Content-Type": "application/json",  'Authorization': `Bearer ${token}` }, 
            credentials: "same-origin",
        }

        fetch(`${ApiUrl}/getCategoriaProducto`, requestOptionsGET)
        .then((response) => { 
            return response.json().then((data) => {
                console.log(data)
                setCategorias(data);
                console.log(categorias)
            }).catch((err) => {
                console.log(err);
            }) 
        });
      }, []);
  
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

        let errorServidor = false;
        let data = {}

        data.Nombre = event.target.nombre.value;
        data.Foto = event.target.foto.value; 
        data.Precio = event.target.precio.value;
        data.Descripcion = event.target.descripcion.value;
        data.id_categoria = event.target.categoria.value;
        data.id_empresa = localStorage.getItem("idUsuario");    

        let requestOptionsPOST = { 
            method: "POST", 
            headers: { "Content-Type": "application/json",  'Authorization': `Bearer ${token}` }, 
            body: JSON.stringify(data),
            credentials: "same-origin",
        }

        fetch(`${ApiUrl}/createProducto`, requestOptionsPOST)
        .then((response) => { 
            return response.json().then((data) => {
                console.log(response);
                console.log(data);

                if (!response.ok) {     
                    if (response.status == 401) {
                        ShowMsg('danger','No esta autorizado a agregar productos');
                    } else {
                        ShowMsg('danger','Error inesperado en el servidor'); 
                    }  
    
                    errorServidor = true;
                    return;
                } else {
                    if (!data.guardado) {
                        ShowMsg('danger','El producto ya fue creado anteriormente');
                        return
                    }
        
                    ShowMsg('success','El producto se ha creado correctamente');
                }

                
            }).catch((err) => {
            console.log(err);
            }) 
        });
    }

    return (
    <Container >
        <h2><MdFastfood />Ingresar productos</h2>

        {showAlert && (
            <Alert className={`alert alert-${alertClass} alert-dismissible fade show`} onClose={() => setShowAlert(false)} dismissible>
                {alertText}
            </Alert>
        )}

        <Form noValidate validated={validated} onSubmit={handleSubmitRegister} >
        <Row xs={1} sm={1} md={1} lg={1} className="g-4">
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" id="nombre" placeholder="Ingresar nombre" tabIndex={2} required autoFocus name='nombre'/>
                    <Form.Control.Feedback type="invalid">Ingrese un nombre</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Foto</Form.Label>
                    <Form.Control type="text" id="foto" placeholder="Ingresar el enlace de la foto" tabIndex={3} required name='foto'/>
                    <Form.Control.Feedback type="invalid">Ingrese una foto</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" id='precio' placeholder="Ingresar precio" tabIndex={4} /*onKeyDown={soloNumeros}*/ /*onInput={noCaracteres}*/ required name='precio'/>
                    <Form.Control.Feedback type="invalid">Ingrese un precio</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control id="descripcion" as="textarea" rows={3} tabIndex={5} required name='descripcion'/>
                </Form.Group> 

                <Form.Group className="mb-3">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select id="categoria" aria-label="Default select example" tabIndex={6} required name="categoria">
                            {categorias.map( (item, index) => {
                                return (
                                    <option key={index} value={item.id_categoria}>{item.nombre}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>      
            </Col>
        </Row>

        <Row>
            <Col>
                <Button variant="primary" type="submit">
                    Ingresar producto
                </Button>
            </Col>
        </Row>

        </Form>
    </Container>
    );
}

export default RegistroEmpresa;