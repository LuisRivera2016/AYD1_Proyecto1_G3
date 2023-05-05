import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './DeshabilitarCuentas.module.css'
import config from '../../config';
import Alerta from '../Shared/Alerta';
import { Modal, Button, Alert } from "react-bootstrap";

function DeshabilitarCuentas() {

    const [cuentasUsuario, setCuentasUsuario] = useState([])
    const [cuentasRepartidor, setCuentasRepartidor] = useState([])
    const [cuentasEmpresas, setCuentasEmpresas] = useState([])
    const [tipoSeleccionado, setTipoSeleccionado] = useState(0)

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

    const getSolicitudPorTipo = (event) => {

        setTipoSeleccionado(event.target.value); 
        console.log(tipoSeleccionado)

        if (event.target.value == 1)  {

            // Usuarios
            console.log(`${config.apiUrlUsuarios}/getUsers`)
            fetch(`${config.apiUrlUsuarios}/getUsers`,config.requestOptionsGET)
            .then(response => {
                if (!response.ok) {
                    console.error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setCuentasUsuario(data)
            }) 
            .catch((error) => {
                console.error(error.message)
                ShowMsg("danger","Error",error.message)
            });

        } else if (event.target.value == 2)  {

            //Empresas
            console.log(`${config.apiUrlUsuarios}/getCompany`)
            fetch(`${config.apiUrlUsuarios}/getCompany`,config.requestOptionsGET)
            .then(response => {
                if (!response.ok) {
                    console.error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setCuentasEmpresas(data)
            }) 
            .catch((error) => {
                console.error(error.message)
                ShowMsg("danger","Error",error.message)            
            });

        } else if (event.target.value == 3)  {

            //Repartidor
            console.log(`${config.apiUrlUsuarios}/getRepartidor`)
            fetch(`${config.apiUrlUsuarios}/getRepartidor`,config.requestOptionsGET)
            .then(response => {
                if (!response.ok) {
                    console.error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setCuentasRepartidor(data)
            }) 
            .catch((error) => {
                console.error(error.message)
                ShowMsg("danger","Error",error.message)            
            });

        }
    }   

    function deshabilitarUsuario(idUsuario,valUpdate) {
        console.log(`${config.apiUrlUsuarios}/userDisable`)
        const data = {
            idUsuario : idUsuario
        };
        config.requestOptionsPOST.body = JSON.stringify(data)
        fetch(`${config.apiUrlUsuarios}/userDisable`,config.requestOptionsPOST)
        .then(response => {
            if (!response.ok) { console.error(response); }
            console.log(response)
            return response.json();
        })
        .then((data) => {
          console.log(data)
          //para actualizar el listado
          const temp = {target:{value:valUpdate}};
          getSolicitudPorTipo(temp)
          ShowMsg("success","Todo Bien","El usuario se ha deshabilitado correctamente")
        })
        .catch((error) => {
          console.error(error.message)
          ShowMsg("danger","Error",error.message)
        });   

    }

    function deshabilitarEmpresa(id) {
        console.log(`${config.apiUrlUsuarios}/companyDisable`)
        const data = {
            idEmpresa : id
        };
        config.requestOptionsPOST.body = JSON.stringify(data)
        fetch(`${config.apiUrlUsuarios}/companyDisable`,config.requestOptionsPOST)
        .then(response => {
            if (!response.ok) { console.error(response); }
            console.log(response)
            return response.json();
        })
        .then((data) => {
          console.log(data)
          //para actualizar el listado
          const temp = {target:{value: "2"}};
          getSolicitudPorTipo(temp)
          ShowMsg("success","Todo Bien","La empresa se ha deshabilitado correctamente")
        })
        .catch((error) => {
          console.error(error.message)
          ShowMsg("danger","Error",error.message)
        });   

    }

    if(tipoSeleccionado==0){
        return (            
            <div style={{padding:20}}>

                {showAlert && (<Alerta key={alertKey} clase={alertClass} titulo={alertTitle} texto={alertText}/>)} 
                    <h4>Deshabilitar Cuentas</h4>
                    <Form.Label>Tipo de Usuario: </Form.Label>
                    <Form.Select aria-label="Default select example" defaultValue="-1" onChange={getSolicitudPorTipo}>
                        <option value="-1" disabled>Seleccione un tipo de usuario</option>
                        <option value="1">Usuarios</option>
                        <option value="2">Empresas</option>
                        <option value="3">Repartidores</option>
                    </Form.Select>       
                <div className="row" style={{marginTop:40}}>
                    <Alert variant='warning'>No ha seleccionado ningun tipo de cuenta.</Alert>                
                </div>       
            </div>
        )
    }

    if(tipoSeleccionado==1){
        return (
            <div style={{padding:20}}>
            {showAlert && (<Alerta key={alertKey} clase={alertClass} titulo={alertTitle} texto={alertText}/>)} 
            <h4>Deshabilitar Cuentas</h4>
            <Form.Label>Tipo de Usuario: </Form.Label>
            <Form.Select aria-label="Default select example" defaultValue="-1" onChange={getSolicitudPorTipo}>
                <option value="-1" disabled>Seleccione un tipo de usuario</option>
                <option value="1">Usuarios</option>
                <option value="2">Empresas</option>
                <option value="3">Repartidores</option>
            </Form.Select>         

            <div className={styles.cardDeshabilitar}>
                <div style={{ margin: '0 auto' }}>
                    {console.log(cuentasUsuario.length)}
                    {cuentasUsuario.length == undefined || cuentasUsuario.length == 0 ? (                        
                        <Alert variant='info'>¡Aun no hay ningun usuario activo!</Alert>
                    ): (cuentasUsuario.map((soli,index) => (
                        <div className="card" style={{marginTop:20}} key={index}>
                            <div className="card-body">
                                <h5 className="card-title">{soli.nombre} {soli.apellido}</h5>   
                                <p className="card-text">Correo: {soli.correo}</p>            
                                <p className="card-text">Telefono: {soli.telefono}</p>                    
                                <a className="btn btn-danger" 
                                    style={{marginRight:10}}
                                    onClick={() => deshabilitarUsuario(soli.id_usuario,"1")}
                                >
                                    <i className="bi bi-x-lg"></i>
                                    Deshabilitar
                                </a>
                            </div>
                        </div>)
                    ))}
                    </div>
                </div>            
            </div>
        )
    }

    if(tipoSeleccionado==2){
        return (
            <div style={{padding:20}}>
            {showAlert && (<Alerta key={alertKey} clase={alertClass} titulo={alertTitle} texto={alertText}/>)} 
            <h4>Deshabilitar Cuentas</h4>
            <Form.Label>Tipo de Usuario: </Form.Label>
            <Form.Select aria-label="Default select example" defaultValue="-1" onChange={getSolicitudPorTipo}>
                <option value="-1" disabled>Seleccione un tipo de usuario</option>
                <option value="1">Usuarios</option>
                <option value="2">Empresas</option>
                <option value="3">Repartidores</option>
            </Form.Select>         
            <div className={styles.cardDeshabilitar}>
                <div style={{ margin: '0 auto' }}>
                    {cuentasEmpresas.length == undefined || cuentasEmpresas.length == 0 ? (
                        <Alert variant='info'>¡Aun no hay ninguna empresa activa!</Alert>
                    ): (cuentasEmpresas.map((soli,index) => (
                        <div className="card" style={{marginTop:20}} key={index}>
                            <div className="card-body">
                                <h5 className="card-title">{soli.nombre}</h5>   
                                <p className="card-text">Correo: {soli.correo}</p>            
                                <p className="card-text">Telefono: {soli.telefono}</p>
                                <p className="card-text">Direccion: {soli.direccion}</p>                        
                                <a className="btn btn-danger" 
                                    style={{marginRight:10}}
                                    onClick={() => deshabilitarEmpresa(soli.id_empresa)}
                                >
                                    <i className="bi bi-x-lg"></i>
                                    Deshabilitar
                                </a>
                            </div>
                        </div>)
                    ))}
                    </div>
                </div>            
            </div>
        )
    }

    return (
        <div style={{padding:20}}>
        {showAlert && (<Alerta key={alertKey} clase={alertClass} titulo={alertTitle} texto={alertText}/>)} 
        <h4>Deshabilitar Cuentas</h4>
        <Form.Label>Tipo de Usuario: </Form.Label>
        <Form.Select aria-label="Default select example" defaultValue="-1" onChange={getSolicitudPorTipo}>
            <option value="-1" disabled>Seleccione un tipo de usuario</option>
            <option value="1">Usuarios</option>
            <option value="2">Empresas</option>
            <option value="3">Repartidores</option>
        </Form.Select>         
        <div className={styles.cardDeshabilitar}>
            <div style={{ margin: '0 auto' }}>
                {cuentasRepartidor.length == undefined || cuentasRepartidor.length == 0 ? (
                    <Alert variant='info'>¡Aun no hay ningun repartidor activo!</Alert>
                )
                :(cuentasRepartidor.map((soli,index) => (
                    <div className="card" style={{marginTop:20}} key={index}>
                        <div className="card-body">
                            <h5 className="card-title">{soli.nombre} {soli.apellido}</h5>   
                            <p className="card-text">Correo: {soli.correo}</p>            
                            <p className="card-text">Telefono: {soli.telefono}</p>    
                            <p className="card-text"> {soli.vehiculo==1 ? "SI": "NO"} posee vehiculo</p>
                                <p className="card-text">Tipo Licencia: {soli.tipo_licencia}</p>                
                            <a className="btn btn-danger" 
                                style={{marginRight:10}}
                                onClick={() => deshabilitarUsuario(soli.id_usuario,"3")}
                            >
                                <i className="bi bi-x-lg"></i>
                                Deshabilitar
                            </a>
                        </div>
                    </div>)
                ))}
                </div>
            </div>            
        </div>
    )
}

export default DeshabilitarCuentas;
