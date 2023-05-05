import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './HistorialPedidos.module.css'
import Alerta from '../Shared/Alerta';
import config from '../../config';
import { Modal, Button, Alert } from "react-bootstrap";

function HistorialPedidos() {

    const [userId, setUserId] = useState(localStorage.getItem('idUsuario'))

    const [pedidos, setPedidos] = useState([])

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

        console.log(`${config.apiUrlUsuarios}/historialPedidoUsuario`)
        const data = {
            idUsuario : userId,
        };
        console.log(data)
        config.requestOptionsPOST.body = JSON.stringify(data)
        fetch(`${config.apiUrlUsuarios}/historialPedidoUsuario`,config.requestOptionsPOST)
        .then(response => {
            if (!response.ok) { console.error(response); }
            return response.json();
        })
        .then((data) => {
          console.log(data)
          if (data.message != undefined){
                //no hay pedidos
                ShowMsg("danger","Informacion",data.message)
          }
          if (data.Pedidos != undefined) {
            setPedidos(data.Pedidos)
          }
        })
        .catch((error) => {
          console.error(error.message)
          ShowMsg("danger","Error",error.message)
        });   

    }, []);

  if (pedidos.length === 0){
    return (
      <div style={{padding:30}}>
        {showAlert && (<Alerta key={alertKey} clase={alertClass} titulo={alertTitle} texto={alertText}/>)} 
        <h4>HISTORIAL PEDIDOS</h4>
        <Alert variant='warning'>No ha hecho ningun pedido aun.</Alert> 
      </div>
    )
  }  

  return (
    <div style={{padding:30}}>
    {showAlert && (<Alerta key={alertKey} clase={alertClass} titulo={alertTitle} texto={alertText}/>)} 
    <h4>HISTORIAL PEDIDOS</h4>
    <div className={styles.cardPedidos}>
        <div style={{ margin: '0 auto' }}>
        {pedidos.map((pedido,index) => (
            <div className="card" style={{marginTop:20}}  key={index}>
                <div className="card-body">
                    <h5 className="card-title">{pedido.nombre}</h5>    
                    <p className="h7">Fecha: {pedido.fecha}</p>            
                    <p className="card-text">{pedido.descripcion}</p>   
                    <p className="h7">Total: Q{pedido.precio}</p>            

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <p className='h5'>Calificacion:</p> 
                      <div className={styles.rating}>
                        <input  type="radio" name={`rating-${index}`} 
                                value="5" 
                                id={`rating-${index}-5`} 
                                checked={pedido.calificacion === 5}
                        /><label htmlFor={`rating-${index}-5`}>☆</label> 
                        <input  type="radio" name={`rating-${index}`} 
                                value="4" 
                                id={`rating-${index}-4`} 
                                checked={pedido.calificacion === 4}
                        /><label htmlFor={`rating-${index}-4`}>☆</label>                         
                        <input  type="radio" name={`rating-${index}`} 
                                value="3" 
                                id={`rating-${index}-3`} 
                                checked={pedido.calificacion === 3}
                        /><label htmlFor={`rating-${index}-3`}>☆</label>                         
                        <input  type="radio" name={`rating-${index}`} 
                                value="2" 
                                id={`rating-${index}-2`} 
                                checked={pedido.calificacion === 2}
                        /><label htmlFor={`rating-${index}-2`}>☆</label> 
                        
                        <input  type="radio" name={`rating-${index}`} 
                                value="1" 
                                id={`rating-${index}-1`} 
                                checked={pedido.calificacion === 1}
                        /><label htmlFor={`rating-${index}-1`}>☆</label>                               

                      </div>                    
                    </div>
                    {pedido.Estado == 0 && <a  className="btn btn-danger">Estado: Cancelado</a> }
                    {pedido.Estado == 1 && <a  className="btn btn-warning">Estado: En revision</a>}
                    {pedido.Estado == 2 && <a  className="btn btn-secondary">Estado: Esperando Repartidor</a>}
                    {pedido.Estado == 3 && <a  className="btn btn-info">Estado: En Camino</a>}
                    {pedido.Estado == 4 && <a  className="btn btn-success">Estado: Entregado</a>}
                </div>
            </div>
        ))}
        </div>
    </div>
</div>
  );
}

export default HistorialPedidos;
