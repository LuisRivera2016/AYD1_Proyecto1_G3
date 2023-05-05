import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import config from '../../config';
import { Modal, Button, Alert } from "react-bootstrap";
import Alerta from '../Shared/Alerta';



function SolicitudesUsuarios() {

    const [solicitudesRep, setSolicitudesRep] = useState([])
    const [solicitudesEmp, setSolicitudesEmp] = useState([])
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

            // Repartidores/Usuarios

            console.log(`${config.apiUrlRepartidor}/getUsuariosEnEsperaR`)
            fetch(`${config.apiUrlRepartidor}/getUsuariosEnEsperaR`,config.requestOptionsGET)
            .then(response => {
                if (!response.ok) {
                    console.error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setSolicitudesRep(data)
            }) 
            .catch((error) => {
                console.error(error.message)
                ShowMsg("danger","Error",error.message)
            });

        } else if (event.target.value == 2)  {

            //Empresas
            console.log(`${config.apiUrlEmpresas}/getEmpresaEnEspera`)
            fetch(`${config.apiUrlEmpresas}/getEmpresaEnEspera`,config.requestOptionsGET)
            .then(response => {
                if (!response.ok) {
                    console.error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setSolicitudesEmp(data)
            }) 
            .catch((error) => {
                console.error(error.message)
                ShowMsg("danger","Error",error.message)            
            });

        }
    }   
    
    function aceptarRepartidor(idUsuario,correo) {
        console.log(`${config.apiUrlUsuarios}/ActivarUsuario`)
        const data = {
            id_usuario : idUsuario,
            Correo:correo
        };
        config.requestOptionsPOST.body = JSON.stringify(data)
        fetch(`${config.apiUrlUsuarios}/ActivarUsuario`,config.requestOptionsPOST)
        .then(response => {
            if (!response.ok) { console.error(response); }
            console.log(response)
            return response.json();
        })
        .then((data) => {
          console.log(data)
          //para actualizar el listado
          const temp = {target:{value: "1"}};
          getSolicitudPorTipo(temp)
          ShowMsg("success","Todo Bien","El Repartidor se ha Habilitado de forma correcta")
        })
        .catch((error) => {
          console.error(error.message)
          ShowMsg("danger","Error",error.message)
        });   


    }

    function denegarRepartidor(idUsuario,correo) {
        console.log(`${config.apiUrlUsuarios}/RechazarUsuario`)
        const data = {
            id_usuario : idUsuario,
            Correo:correo
        };
        config.requestOptionsPOST.body = JSON.stringify(data)
        fetch(`${config.apiUrlUsuarios}/RechazarUsuario`,config.requestOptionsPOST)
        .then(response => {
            if (!response.ok) { console.error(response); }
            console.log(response)
            return response.json();
        })
        .then((data) => {
          console.log(data)
          //para actualizar el listado
          const temp = {target:{value: "1"}};
          getSolicitudPorTipo(temp)
          ShowMsg("success","Todo Bien","El Repartidor se ha rechazado correctamente")
        })
        .catch((error) => {
          console.error(error.message)
          ShowMsg("danger","Error",error.message)
        });   

    }

    function aceptarEmpresa(idEmpresa,correo) {
        console.log(`${config.apiUrlEmpresas}/ActivarEmpresa`)
        const data = {
            id_empresa : idEmpresa,
            Correo: correo
        };
        config.requestOptionsPOST.body = JSON.stringify(data)
        fetch(`${config.apiUrlEmpresas}/ActivarEmpresa`,config.requestOptionsPOST)
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
          ShowMsg("success","Todo Bien","La empresa se ha Habilitado de forma correcta")
        })
        .catch((error) => {
          console.error(error.message)
          ShowMsg("danger","Error",error.message)
        });   

    }

    function denegarEmpresa(idUsuario,correo) {
        console.log(`${config.apiUrlEmpresas}/RechazarEmpresa`)
        const data = {
            id_empresa : idUsuario,
            Correo:correo
        };
        config.requestOptionsPOST.body = JSON.stringify(data)
        fetch(`${config.apiUrlEmpresas}/RechazarEmpresa`,config.requestOptionsPOST)
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
          ShowMsg("success","Todo Bien","La empresa se ha rechazado correctamente")
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

                <h4>Administrar solicitudes</h4>
                <Form.Label>Tipo de solicitud: </Form.Label>
                <Form.Select aria-label="Default select example" id='selectTipo' defaultValue="-1" onChange={getSolicitudPorTipo}>
                    <option value="-1" disabled>Seleccione tipo de Solicitud</option>
                    <option value="1">Repartidores</option>
                    <option value="2">Empresas</option>
                    <option value="3">Solicitud de Cambio de zona</option>
                </Form.Select>  
                <div className="row" style={{marginTop:40}}>
                    <Alert variant='warning'>No ha seleccionado ningun tipo de solicitud.</Alert>                
                </div>       
            </div>
        )
    }

    if(tipoSeleccionado==1){
        return (
            <div style={{padding:20}}>

            {showAlert && (<Alerta key={alertKey} clase={alertClass} titulo={alertTitle} texto={alertText}/>)} 
                 
                <h4>Administrar solicitudes</h4>
                <Form.Label>Tipo de solicitud: </Form.Label>
                <Form.Select aria-label="Default select example" id='selectTipo' defaultValue="-1" onChange={getSolicitudPorTipo}>
                    <option value="-1" disabled>Seleccione tipo de Solicitud</option>
                    <option value="1">Repartidores</option>
                    <option value="2">Empresas</option>
                    <option value="3">Solicitud de Cambio de zona</option>
                </Form.Select>         

                <div className="row" style={{marginTop:20}}>
                    <h3>Solicitudes Repartidores:</h3>
                    {solicitudesRep.length === 0 &&(
                        <Alert variant='info'>¡No hay ninguna solicitud de Repartidor Pendiente!</Alert>
                    )}
                    {solicitudesRep.map((soli,index) => (
                        <div className="col-sm-6" key={index}>
                            <div className="card" style={{marginTop:20}}>
                            <div className="card-body">
                                <h5 className="card-title">{soli.nombre} {soli.apellido}</h5>    
                                <p className="card-text">Correo: {soli.correo}</p>            
                                <p className="card-text">Telefono: {soli.telefono}</p>
                                <p className="card-text"> {soli.vehiculo==1 ? "SI": "NO"} posee vehiculo</p>
                                <p className="card-text">Tipo Licencia: {soli.tipo_licencia}</p>
                                <a href={soli.url_cv} className="btn btn-primary" style={{marginRight:10}} target='_blank'>Abrir CV</a>
                                
                                <a  className="btn btn-success" 
                                    style={{marginRight:10}} 
                                    onClick={() => aceptarRepartidor(soli.id_usuario,soli.correo)}>
                                    <i className="bi bi-check2"></i>
                                    Aceptar
                                </a>
                                <a className="btn btn-danger" 
                                    style={{marginRight:10}}
                                    onClick={() => denegarRepartidor(soli.id_usuario,soli.correo)}    
                                >
                                    <i className="bi bi-x-lg"></i>
                                    Rechazar
                                </a>
                                
                            </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        );
    }

    return (
        <div style={{padding:20}}>

            {showAlert && (<Alerta key={alertKey} clase={alertClass} titulo={alertTitle} texto={alertText}/>)} 

            <h4>Administrar solicitudes</h4>
            <Form.Label>Tipo de solicitud: </Form.Label>
            <Form.Select aria-label="Default select example" id='selectTipo' defaultValue="-1" onChange={getSolicitudPorTipo}>
                <option value="-1" disabled>Seleccione tipo de Solicitud</option>
                <option value="1">Repartidores</option>
                <option value="2">Empresas</option>
                <option value="3">Solicitud de Cambio de zona</option>
            </Form.Select>         
            
            <div className="row" style={{marginTop:20}}>
            <h3>Solicitudes Empresas:</h3>
                {solicitudesEmp.length === 0 &&(
                    <Alert variant='info'>¡No hay ninguna solicitud de Empresas Pendiente!</Alert>
                )}
                {solicitudesEmp.map((soli,index) => (
                    <div className="col-sm-6" key={index}>
                        <div className="card" style={{marginTop:20}}>
                        <div className="card-body">
                            <h5 className="card-title">{soli.nombre} </h5>    
                            <p className="card-text"> {soli.descripcion}</p>            
                            <p className="card-text">Correo: {soli.correo}</p>
                            <p className="card-text">Telefono: {soli.telefono}</p>
                            <p className="card-text">Direccion: {soli.direccion}</p>
                            <a href={soli.url_documento} className="btn btn-primary" style={{marginRight:10}} target='_blank'>Documentos</a>
                            <a  className="btn btn-success" 
                                style={{marginRight:10}}
                                onClick={() => aceptarEmpresa(soli.id_empresa,soli.correo)}
                            >
                                <i className="bi bi-check2"></i>
                                Aceptar
                            </a>
                            <a  className="btn btn-danger"
                                style={{marginRight:10}}
                                onClick={() => denegarEmpresa(soli.id_empresa,soli.correo)}
                            >
                                
                                <i className="bi bi-x-lg"></i>
                                Rechazar
                            </a>
                            
                        </div>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    );
}

export default SolicitudesUsuarios;
