import React, { useState,useEffect} from 'react';
import config from '../../config';
import { Alert } from 'react-bootstrap';

function VerProductosEmpresa() {

  const [productos, setProductos] = useState([])

  useEffect(() => {

    if(localStorage.getItem("idUsuario") == null ){
        window.location.href = `/login`;
        return
    }

    const data = {
      id_empresa:localStorage.getItem("idUsuario")
    };
    console.log(data)

    console.log(`${config.apiUrlEmpresas}/getAllProducts`)
      config.requestOptionsPOST.body = JSON.stringify(data)
      fetch(`${config.apiUrlEmpresas}/getAllProducts`,config.requestOptionsPOST)
      .then(response => {
          if (!response.ok) {
              console.error(response.statusText);
          }
          return response.json();
      })
      .then((data) => {
        console.log(data)
        setProductos(data)
        
      }) //mensaje de respuesta del server
      .catch((error) => {
        console.error(error.message)
      });

}, []);

  return (
    <div style={{padding:20}}>

        {productos.length === 0 &&(
            <Alert variant='info'>¡No hay ningun producto Agregado en su empresa!</Alert>
        )}

        <div className="row">
          {productos.map((image,index) => (
            <div className="col-md-4 p-1" key={index}>
              <div className="card border-primary h-100 card-image" >    
                   <p className='h4'>{image.nombre}</p>
                  <img src={image.foto} className="img-fluid h-100 w-100" />  
                  <p className='h5'>Q {image.precio} </p>                           
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default VerProductosEmpresa;
