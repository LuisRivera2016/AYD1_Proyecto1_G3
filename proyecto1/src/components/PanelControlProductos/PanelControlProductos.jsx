import React, { useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import config from '../../config';
import Alerta from '../Shared/Alerta';

function PanelControlProductos() {
    // Variables
    const [empresaId, setEmpresaId] = useState(localStorage.getItem('idUsuario'))
    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])
    const [srcFoto, setSrcFoto] = useState("default.jpg")

    const [validated, setValidated] = useState(false);
    const [indexForm, setIndexForm] = useState(0);

    //Para la alerta
    const [showAlert, setShowAlert] = useState(false);
    const [alertClass, setAlertClass] = useState("");
    const [alertTitle, setAlertTitle] = useState("");
    const [alertText, setAlertText] = useState("");
    const [alertKey, setAlertKey] = useState(0);
    function ShowMsg(alertClass, alertTitle, alertText) {
        setShowAlert(false); // Asegura que el componente se muestre cada vez
        setShowAlert(true);
        setAlertClass(alertClass);
        setAlertTitle(alertTitle);
        setAlertText(alertText);
        setAlertKey(alertKey + 1); // Incrementa la clave única para forzar el reinicio del componente
    }

    useEffect(() => {
        
        // ------------------ Obtener Productos ------------------
        const data = {
            id_empresa : parseInt(empresaId),
        };
        console.log(data)
        console.log(`${config.apiUrlEmpresas}/getAllProducts`)
        config.requestOptionsPOST.body = JSON.stringify(data)
        fetch(`${config.apiUrlEmpresas}/getAllProducts`,config.requestOptionsPOST)
        .then(response => {
            if (!response.ok) { console.error(response); }
            console.log(response)
            return response.json();
        })
        .then((data) => {
          console.log(data)
          setProductos(data)
          
          if(data.length === 0){
            ShowMsg("danger","No se encontraron productos","No hay productos en su empresa, agrege unos.")
          }
          //ShowMsg("warning","Informacion",data.message)
        })
        .catch((error) => {
          console.error(error.message)
          ShowMsg("danger","Error al obtener productos",error.message)
        });   

        // ------------------ Obtener Categorias ------------------ 
        console.log(`${config.apiUrlEmpresas}/getCategoriaProducto`)
        fetch(`${config.apiUrlEmpresas}/getCategoriaProducto`,config.requestOptionsGET)
        .then(response => {
            if (!response.ok) {
                console.error(response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
            setCategorias(data)
        }) 
        .catch((error) => {
            console.error(error.message)
            ShowMsg("danger","Error al obtener categorias",error.message)
        });

    }, []);

    const getSelectedProduct = (event) => {
        if (productos.length > 0 ) {
            const id_producto = parseInt(event.target.value);
            const productoEncontrado = productos.find(producto => producto.id_producto === id_producto );
            setSelectedProduct(productoEncontrado);
            setSrcFoto(productoEncontrado.foto)
            setIndexForm(indexForm + 1); //Para forzar el renderizado del form
            console.log(productoEncontrado.id_categoria)
            document.getElementById('cmbCategoria').value = productoEncontrado.id_categoria
        }
    }

    const handleEdit = (event) => {
        
        event.preventDefault();
        const form = event.currentTarget;
        event.stopPropagation();
        setValidated(true);
        if (form.checkValidity() === false) {return}
        if (document.getElementById('cmbProducto').value == -2){
            ShowMsg("danger","Producto Invalido","Seleccione un producto valido")
            return
        }
        if (isNaN(event.target.precio.value)){
            ShowMsg("danger","Valor de Precio Invalido","Ingrese un valor numerico para el precio")
            return
        }
        if (!validarUrl(event.target.enlace.value)){
            ShowMsg("danger","URL Invalida","Ingrese una valida url para imagen valida")
            return
        }
        if (event.target.categoria.value == -1){
            ShowMsg("danger","Categoria Invalido","Seleccione una categoria valida")
            return
        }

        const data = {
            Nombre:event.target.nombre.value,
            Descripcion:event.target.descripcion.value,
            Foto:event.target.enlace.value,
            Precio:parseFloat(event.target.precio.value),
            id_categoria:parseInt(event.target.categoria.value),
            id_producto:parseInt(document.getElementById('cmbProducto').value),
        };
        console.log(data)
        
        console.log(`${config.apiUrlEmpresas}/actualizarProducto`)
        config.requestOptionsPOST.body = JSON.stringify(data)
        fetch(`${config.apiUrlEmpresas}/actualizarProducto`,config.requestOptionsPOST)
        .then(response => {
            if (!response.ok) {
                console.error(response.statusText);
                ShowMsg("danger","Error al actualizar",response)
            }
            return response.json();
        })
        .then((data) => {
          console.log(data)
          if(data.guardado){
            ShowMsg("success","Todo bien","El producto se ha modificado correctamente")
            setTimeout(() => {window.location.reload();}, 2500);
          }else{
            ShowMsg("danger","Error","NO se pudo actualizar el producto correctamente")
          }
          
        }) //mensaje de respuesta del server
        .catch((error) => {
          console.error(error.message)
          ShowMsg("danger","Error al actualizar",error.message)
        });


    }
    
    function validarUrl(url) {
        const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
        return regex.test(url);
    }
    function validarNumeros(url) {
        const regex = /\d+\.?\d*/;
        return regex.test(url);
    }


  return (
    <div style={{padding:20}}>

        <h4>Panel Control Productos</h4>
        {showAlert && (<Alerta key={alertKey} clase={alertClass} titulo={alertTitle} texto={alertText}/>)} 
        
        
        <Row style={{margin:'20px 10px 30px 0px'}}>                 
            <Form.Label>Producto a editar: </Form.Label>
            <Form.Select id='cmbProducto' defaultValue="-2" onChange={getSelectedProduct}>
                <option value="-2" disabled>Seleccione un producto</option>
                {productos.map((product,index) => (
                    <   option key={index} 
                        value={product.id_producto}                        
                    >  {product.nombre} </option>
                ))}
            </Form.Select>  
        </Row>
        <div className='row'>
        <div className="col-3">
            <img src={srcFoto} alt="Imagen" id='imgProducto'/>
        </div>
        <div className="col-8">

        <Form noValidate validated={validated} onSubmit={handleEdit} key={indexForm}>
            <Row> 
                <Col>               
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control name='nombre' type="text" defaultValue={selectedProduct.nombre} id='txtUser'required/>
                    <Form.Control.Feedback tooltip>Todo Bien!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Por favor ingrese un nombre.</Form.Control.Feedback> 
                </Col>
                
                <Col>
                    <Form.Label>Precio*</Form.Label>
                    <Form.Control name='precio' type="text" defaultValue={selectedProduct.precio} id='txtUser'required/>
                    <Form.Control.Feedback tooltip>Todo Bien!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Por favor ingrese un precio valido.</Form.Control.Feedback> 
                </Col>
            </Row>

            <Row> 
                <Col>               
                    <Form.Label>Enlace de la Foto*</Form.Label>
                    <Form.Control name='enlace' type="text" defaultValue={selectedProduct.foto} id='txtUser'required/>
                    <Form.Control.Feedback tooltip>Todo Bien!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Por favor ingrese un enlace.</Form.Control.Feedback> 
                </Col>
                
                <Col>
                    <Form.Label>Categoria(s)*</Form.Label>
                    <Form.Select name='categoria' defaultValue={selectedProduct.id_categoria} id='cmbCategoria'>
                        <option value="-1" disabled selected>Seleccione una categoria</option>
                        {categorias.map((cate,index) => (
                            <   option key={index} 
                                value={cate.id_categoria}                        
                            >  {cate.nombre} </option>
                        ))}
                    </Form.Select>  
                </Col>
            </Row>
            <Row style={{padding:10}}>
                <Form.Label>Descripcion</Form.Label>
                <Form.Control name='descripcion' required as="textarea" defaultValue={selectedProduct.descripcion} style={{ height: '100px' }} />
                <Form.Control.Feedback tooltip>Todo Bien!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Por favor ingrese una descripcion.</Form.Control.Feedback> 
            </Row>

            <Button type="submit" style={{marginTop:15}}>
            <i className="bi bi-pencil-square" style={{paddingRight:10}}></i>
             Editar Producto
          </Button>
        </Form>
        </div>
        </div>
    </div>
  );
}

export default PanelControlProductos;
