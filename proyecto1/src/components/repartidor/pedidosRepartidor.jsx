import './repartidorStyle.css';
import { MDBBadge, MDBBtn, MDBContainer, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

const ApiUrl = "http://127.0.0.1:4500"

function PedidosRepartidor (){
    const { repartidorId } = useParams();

    var Pedido = {
      Nombre : "", 
      Direccion : "",
      Fecha: "",
      Instrucciones: "",
      Descripcion: "",
      Foto: "",
      Precio: "",
      Telefono: ""
    }
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(()=>{

        fetch(`${ApiUrl}/listaSolicitudes`, {
        method: "POST",
        body: JSON.stringify({"idRepartidor" : repartidorId}),
        headers: {"Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`
      }
      })
      .then(response => {return response.json()})
      .then((data) => {
         console.log(data)
         setData(data.Pedidos);
        // Pedido.Nombre = data.Pedidos.nombre
      }).catch((error) => {
          console.error(error.message)
      });
      },[])

      if (!data) {
        return (

          <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
          <MDBContainer className="py-5 h-100">
          <div className="App">
            No hay pedidos asignados al repartidor...
          </div>
      </MDBContainer>
      </section>

        )
    }
  
      return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
        <MDBContainer className="py-5 h-100">
        <div className="App">
       <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Foto</th>
          <th scope='col'>Precio</th>
          <th scope='col'>Descripción</th>
          <th scope='col'>Restaurante</th>
          <th scope='col'>Dirección</th>
          <th scope='col'>Fecha</th>
          <th scope='col'>Instrucciones</th>
          <th scope='col'>Teléfono</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data.map((item, index) => (
        <tr key={index}>
           <td>
            <div>
              <img
                src={item.foto}
                alt=''
                style={{ width: '100px', height: '100px' }}
                className='rounded-circle'
              />
            </div>
          </td>
          <td>
          <MDBBadge color='warning' pill>
          {"Q"+item.precio}
            </MDBBadge>
          </td>
          <td>
              <div className='ms-3'>
                {item.descripcion}
              </div>
          </td>
          <td>
              <div className='ms-3'>
                {item.nombre}
              </div>
          </td>
          <td>
              <div className='ms-3'>
                {item.direccion}
              </div>
          </td>
          <td>
              <div className='ms-3'>
                {item.fecha}
              </div>
          </td>
          <td>
              <div className='ms-3'>
                {item.instrucciones}
              </div>
          </td>
          <td>
              <MDBBadge color='primary' pill>
              {item.telefono}
            </MDBBadge>
          </td>
        </tr>
        ))}

      </MDBTableBody>
    </MDBTable>
      </div>
      </MDBContainer>
      </section>
    );

  }
  

export default PedidosRepartidor;