import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import config from '../../config';
import Form from 'react-bootstrap/Form';
import Alerta from '../Shared/Alerta';


import styles from './CarritoCompras.module.css'; // Archivo CSS para estilos personalizados

function CarritoCompras() {

    const [showConf, setShowConf] = useState(false);
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const [carrito, setCarrito] = useState({items:[]});

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
        let itemsGuardados =  JSON.parse(localStorage.getItem('carrito'))
        if (itemsGuardados != null) {
          setCarrito({items:itemsGuardados})
        }
    }, []);
    const handleClose = () => {setShow(false)};//addProducto()
    const handleShow = () => {setShow(true)};

    const handleContinuar = () => {
      console.log(carrito)
      if(carrito.items.length <= 0 ){
        ShowMsg("warning","No hay productos","No hay productos en el carrito, agrege uno para poder pagar")
      }else{
        setShowConf(true)
      }
    };


    const aumentarCantidad = (itemIndex) => {
      const newItems = [...carrito.items]; // crear una copia del arreglo de items
      newItems[itemIndex].cantidad++; // aumentar la cantidad del item seleccionado
      setCarrito({ ...carrito, items: newItems }); // actualizar el carrito con los nuevos items
    };

    const disminuirCantidad = (itemIndex) => {
      const newItems = [...carrito.items]; // crear una copia del arreglo de items
      newItems[itemIndex].cantidad--; // aumentar la cantidad del item seleccionado

      if (newItems[itemIndex].cantidad === 0){
        newItems.splice(itemIndex, 1); // eliminar el elemento del array
      }
      setCarrito({ ...carrito, items: newItems }); // actualizar el carrito con los nuevos items
      
    };

    const agregarDescripcion = (itemIndex) => (event) => {
      const newItems = [...carrito.items]; // crear una copia del arreglo de items
      newItems[itemIndex].personalizar = event.target.value; 
      setCarrito({ ...carrito, items: newItems }); // actualizar el carrito con los nuevos items
    };
  
    function getCantidad() {
      let total = 0;
      if (carrito.items != null ){
        carrito.items.forEach((item) => {
          total += item.cantidad;
        });
      }
      //setNumero(total)
      return total;
    }

    function getTotal() {
      let total = 0;
      carrito.items.forEach((item) => {
        total += item.cantidad*item.producto.precio;
      });
      //setNumero(total)
      return total;
    }

    function addProducto(){
      const nuevoItem = {
          producto:   {
            id_producto: 2,
            nombre: "Pizza vegetariana",
            descripcion: "Pizza con vegetales frescos y salsa de tomate",
            foto: "https://cdn0.recetasgratis.net/es/posts/5/2/4/pizza_vegetariana_casera_12425_orig.jpg",
            precio: 90,
            id_categoria: 2,
            id_empresa: 3
          },
          cantidad: 1,
          personalizar: "Sin hielo"  
      };
      carrito.items.push(nuevoItem);
      console.log(carrito)
    }

    const confirmarPago = (event) => {
      //event.preventDefault();
      //const form = event.currentTarget;
      //event.stopPropagation();
      setValidated(true);
      console.log("hola")

      //if (form.checkValidity() === false) {return}
      if (document.getElementById('cmbTarjeta').value == -1){
        ShowMsg("danger","Tarjeta Invalida","Seleccione una tarjeta valida")
        return
      }
      if (document.getElementById('txtDireccion').value == ""){
        ShowMsg("danger","Direccion Invalida","Ingrese una direccion valida")
        return
      }

      const data = {
        Estado:1,
        Instrucciones:document.getElementById('txtInst').value,
        Direccion:document.getElementById('txtDireccion').value,
        Calificacion:-1, //to-do (se deja asi pq al inicio no ha calificado el pedido)
        IdMunicipio:1, //to-do
        IdUsuario:parseInt(localStorage.getItem('idUsuario')), 
        IdRepartidor:1, // to-do (se deja asi pq al inicio no tiene repartidor)
        IdTarjeta:parseInt(document.getElementById('cmbTarjeta').value),

        productos: carrito.items.map((item) => {
          return {
            IdProducto: item.producto.id_producto,
            Cantidad: item.cantidad,
            Personalizacion: item.personalizar
          }
        })
      };
      console.log(data)

      console.log(`${config.apiUrlUsuarios}/AceptarPedido`)
        config.requestOptionsPOST.body = JSON.stringify(data)
        fetch(`${config.apiUrlUsuarios}/AceptarPedido`,config.requestOptionsPOST)
        .then(response => {
            if (!response.ok) {
                console.error(response);
                ShowMsg("danger","Error procesar el pedido",response)
            }
            return response.json();
        })
        .then((data) => {
          console.log(data)
          if(data.guardado){
            ShowMsg("success","Todo bien","El pedido se ha procesado correctamente")
            //to-do mandar a vista del estado del pedido
          }else{
            ShowMsg("danger","Error","NO se pudo procesar el pedido")
          }
          
        }) //mensaje de respuesta del server
        .catch((error) => {
          console.error(error.message)
          ShowMsg("danger","Error al procesar el pedido",error.message)
        });
      
    }

  return (
    <>
        <button className={styles.btnCarrito} onClick={handleShow}>
            <i className="bi bi-cart4"></i>
            { getCantidad() > 0 && (<span className={styles.btnBadge}>{getCantidad()}</span>)}
        </button>

        {showAlert && (<Alerta key={alertKey} clase={alertClass} titulo={alertTitle} texto={alertText}/>)} 

        <Modal size="xl" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Carrito de Compra</Modal.Title>
            </Modal.Header>

            <Modal.Body>

              <div className="container">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Articulo</th><th scope="col">Cantidad</th>
                      <th scope="col">Editar</th><th scope="col">Total</th><th scope="col">Personalizacion</th>
                    </tr>
                  </thead>
                  <tbody id="items">
                  {carrito.items.map((item, index) => (
                      <tr key={index}>        
                        <td>{item.producto.nombre}</td><td>{item.cantidad}</td>
                        <td>
                            <button 
                              className="btn btn-info btn-sm" 
                              onClick={() => aumentarCantidad(index)}
                            >+</button>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => disminuirCantidad(index)}
                            >-</button>
                        </td>
                        <td>Q <span>{item.cantidad*item.producto.precio}</span></td>
                        <td>
                          <Form.Control type="text" 
                                        name="txtPersonalizar" 
                                        placeholder="Sin cebolla" 
                                        onChange={agregarDescripcion(index)}/>
                        </td>
                      </tr>      
                    ))}  
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row">Total productos</th>
                      <td>{getCantidad()}</td>
                      <td>
                        <Button variant="outline-danger" 
                                style={{marginTop:10}}
                                onClick={() => {setCarrito({...carrito,items: []}) }}
                        >Vaciar Carrito</Button>
                      </td>
                      <td className="font-weight-bold">Q<span>{getTotal()}</span></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Cerrar
              </Button>
              <Button variant="primary" onClick={handleContinuar}>
                  Continuar a Pagar
              </Button>
            </Modal.Footer>
        </Modal>

        <Modal
          show={showConf}
          onHide={() => setShowConf(false)}
          style={{ backgroundColor: "rgba(128, 128, 128, 0.85)" }}
        >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Pago</Modal.Title>
        </Modal.Header>
            <Form noValidate validated={validated} onSubmit={confirmarPago}>
        <Modal.Body>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Confirmar Direccion de entrega* </Form.Label>
                <Form.Control type="text" required name='txtDireccion' id='txtDireccion' placeholder="12-30 zona 0 Guatemala"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Instrucciones de Entrega</Form.Label>
                <Form.Control as="textarea" name='txtInst' id='txtInst' rows={3} placeholder="dejar en puerta" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Metodo de pago</Form.Label>
                <Form.Select id='cmbTarjeta'>
                  <option value="-1" >Seleccione una tarjeta</option>
                  <option value="1" >VISA ************0103</option> {/*to-do*/}
                </Form.Select>
              </Form.Group>
              <p className='h4 text-success'>Monto Total: Q {getTotal()}</p>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConf(false)}>
            Cancelar
          </Button>
          <Button variant="success" type="submit" onClick={() => confirmarPago(false)}>
            Confirmar Pago
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default CarritoCompras;
