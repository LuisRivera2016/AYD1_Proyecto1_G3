import './repStyle.css';
import { MDBBadge, MDBBtn, MDBContainer, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

const ApiUrl = "http://127.0.0.1:4500"

function Reportes (){

    const [data1Tb1, setData1Tb1] = useState([]);
    const [data1Tb2, setData1Tb2] = useState([]);
    const [data1Tb3, setData1Tb3] = useState([]);
    const [data1Tb4, setData1Tb4] = useState([]);
    const [data1Tb5, setData1Tb5] = useState([]);

    const [data2Tb1_1, setData2Tb1_1] = useState();
    const [data2Tb1_2, setData2Tb1_2] = useState();
    const [data2Tb1_3, setData2Tb1_3] = useState();
    const [data2Tb1_4, setData2Tb1_4] = useState();
    const [data2Tb1_6, setData2Tb1_6] = useState();
    const [data2Tb5, setData2Tb5] = useState([]);
    const [data2Tb7, setData2Tb7] = useState([]);

    const [data3Tb1, setData3Tb1] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(()=>{

        fetch(`${ApiUrl}/getAdminAllReports`, {
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`
      }
      })
      .then(response => {return response.json()})
      .then((data) => {
         console.log(data)
         setData1Tb1(data.cons1);
         setData1Tb2(data.cons2);
         setData1Tb3(data.cons3);
         setData1Tb4(data.cons4);
         setData1Tb5(data.cons5);
        // Pedido.Nombre = data.Pedidos.nombre
      }).catch((error) => {
          console.error(error.message)
      });
      },[])

      useEffect(()=>{

        fetch(`${ApiUrl}/getAdminAllReports2`, {
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`
      }
      })
      .then(response => {return response.json()})
      .then((data) => {
         console.log(data)
         setData2Tb1_1(data.cons1[0].NumUsuariosTotales);
         setData2Tb1_2(data.cons2[0].NumRepartidores);
         setData2Tb1_3(data.cons3[0].NumEmpresa);
         setData2Tb1_4(data.cons4[0].usuariosActivos);
         setData2Tb1_6(data.cons6[0].NuevosUsuarios);
         setData2Tb5(data.cons5);
         setData2Tb7(data.cons7);

        // Pedido.Nombre = data.Pedidos.nombre
      }).catch((error) => {
          console.error(error.message)
      });
      },[])

      useEffect(()=>{

        fetch(`${ApiUrl}/getAdminAllReports3`, {
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`
      }
      })
      .then(response => {return response.json()})
      .then((data) => {
         console.log(data)
         setData3Tb1(data.cons1);
        // Pedido.Nombre = data.Pedidos.nombre
      }).catch((error) => {
          console.error(error.message)
      });
      },[])

      if (!data1Tb1 || !data1Tb2) {
        return (

          <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
          <MDBContainer className="py-5 h-100">
          <div className="App">
            No hay resultado para este reporte...
          </div>
      </MDBContainer>
      </section>

        )
    }
  
      return (
        <section className="vh-100">
        <MDBContainer className="py-5 h-100">
            <h2>Reportes de empresas</h2>
        <div className="App1" style={{ backgroundColor: '#f5f5f5' }}>
        <MDBBadge color='dark' pill>
        <h5>Total de pedidos realizados en el sistema</h5>
        </MDBBadge>
       <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col' style={{ color: '#404040' }}>Total</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data1Tb1.map((item, index) => (
        <tr key={index}>
          <td>
          <MDBBadge color='warning' pill>
          {item.NumPedidosTotales}
            </MDBBadge>
          </td>
        </tr>
        ))}
      </MDBTableBody>
    </MDBTable>

    <MDBBadge color='dark' pill>
    <h5>Total de pedidos por empresa</h5>
    </MDBBadge>
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col' style={{ color: '#404040' }}>Empresa</th>
          <th scope='col' style={{ color: '#404040' }}>Total</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data1Tb2.map((item, index) => (
        <tr key={index}>
          <td>
          <MDBBadge color='warning' pill>
          {item.nombre}
            </MDBBadge>
          </td>
          <td>
          {item.total}
          </td>
        </tr>
        ))}
      </MDBTableBody>
    </MDBTable>

    <MDBBadge color='dark' pill>
    <h5>Valor de las ventas</h5>
    </MDBBadge>
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col' style={{ color: '#404040' }}>Empresa</th>
          <th scope='col' style={{ color: '#404040' }}>Valor en ventas (Q)</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data1Tb3.map((item, index) => (
        <tr key={index}>
          <td>
          <MDBBadge color='warning' pill>
          {item.nombre}
            </MDBBadge>
          </td>
          <td>
          {"Q "+item.ValorVentas}
          </td>
        </tr>
        ))}
      </MDBTableBody>
    </MDBTable>

    <MDBBadge color='dark' pill>
    <h5>Top productos mas vendidos</h5>
    </MDBBadge>
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col' style={{ color: '#404040' }}>Producto</th>
          <th scope='col' style={{ color: '#404040' }}>Empresa</th>
          <th scope='col' style={{ color: '#404040' }}>Veces vendido</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data1Tb4.map((item, index) => (
        <tr key={index}>
          <td>
          <MDBBadge color='warning' pill>
          {item.producto}
            </MDBBadge>
          </td>
          <td>
          {item.nombre}
          </td>
          <td>
          {item.vecesVendidos}
          </td>
        </tr>
        ))}
      </MDBTableBody>
    </MDBTable>

    <MDBBadge color='dark' pill>
    <h5>Top restaurantes con mayor desempeño</h5>
    </MDBBadge>
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col' style={{ color: '#404040' }}>Empresa</th>
          <th scope='col' style={{ color: '#404040' }}>no. Pedidos</th>
          <th scope='col' style={{ color: '#404040' }}>Municipio</th>
          <th scope='col' style={{ color: '#404040' }}>Departamento</th>
          <th scope='col' style={{ color: '#404040' }}>Direccion</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data1Tb5.map((item, index) => (
        <tr key={index}>
          <td>
          <MDBBadge color='warning' pill>
          {item.nombre}
            </MDBBadge>
          </td>
          <td>
          {item.NumPedidos}
          </td>
          <td>
          {item.municipio}
          </td>
          <td>
          {item.departamento}
          </td>
          <td>
          {item.direccion}
          </td>
        </tr>
        ))}
      </MDBTableBody>
    </MDBTable>

      </div>

      <h2>Reportes de usuarios</h2>
      <div className="App1" style={{ backgroundColor: '#fffceb' }}>
        <MDBBadge color='dark' pill>
        <h5>Información de usuarios del sistema</h5>
        </MDBBadge>
       <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col' style={{ color: '#404040' }}>Usuarios normales</th>
          <th scope='col' style={{ color: '#404040' }}>Repartidores</th>
          <th scope='col' style={{ color: '#404040' }}>Empresas</th>
          <th scope='col' style={{ color: '#404040' }}>Usuarios activos</th>
          <th scope='col' style={{ color: '#404040' }}>Usuarios nuevos</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>
          <MDBBadge color='info' pill>
         {data2Tb1_1}
         </MDBBadge>
          </td>
          <td>
          <MDBBadge color='info' pill>
         {data2Tb1_2}
         </MDBBadge>
          </td>
          <td>
          <MDBBadge color='info' pill>
         {data2Tb1_3}
         </MDBBadge>
          </td>
          <td>
          <MDBBadge color='info' pill>
         {data2Tb1_4}
         </MDBBadge>
          </td>
          <td>
          <MDBBadge color='info' pill>
         {data2Tb1_6}
         </MDBBadge>
          </td>
        </tr>
      </MDBTableBody>
    </MDBTable>

    <MDBBadge color='dark' pill>
    <h5>Usuarios activos</h5>
    </MDBBadge>
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col' style={{ color: '#404040' }}>Nombre</th>
          <th scope='col' style={{ color: '#404040' }}>Apellido</th>
          <th scope='col' style={{ color: '#404040' }}>Correo</th>
          <th scope='col' style={{ color: '#404040' }}>Telefono</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data2Tb5.map((item, index) => (
        <tr key={index}>
          <td>
          <MDBBadge color='warning' pill>
          {item.nombre}
            </MDBBadge>
          </td>
          <td>
          {item.apellido}
          </td>
          <td>
          {item.correo}
          </td>
          <td>
          {item.telefono}
          </td>
        </tr>
        ))}
      </MDBTableBody>
    </MDBTable>

    <MDBBadge color='dark' pill>
    <h5>Usuarios nuevos</h5>
    </MDBBadge>
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col' style={{ color: '#404040' }}>Nombre</th>
          <th scope='col' style={{ color: '#404040' }}>Apellido</th>
          <th scope='col' style={{ color: '#404040' }}>Correo</th>
          <th scope='col' style={{ color: '#404040' }}>Telefono</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
    
      {data2Tb7.map((item, index) => (
        <tr key={index}>
          <td>
          <MDBBadge color='warning' pill>
          {item.nombre}
            </MDBBadge>
          </td>
          <td>
          {item.apellido}
          </td>
          <td>
          {item.correo}
          </td>
          <td>
          {item.telefono}
          </td>
        </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
      </div>

      <h2>Reportes de repartidores</h2>
      <div className="App1" style={{ backgroundColor: '#fbfff5' }}>
       
    <MDBBadge color='dark' pill>
    <h5>Informacion de repartidores del sistema</h5>
    </MDBBadge>
                <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                    <th scope='col' style={{ color: '#404040' }}>Nombre</th>
                    <th scope='col' style={{ color: '#404040' }}>Calificación</th>
                    <th scope='col' style={{ color: '#404040' }}>Pedido realizados</th>
                    <th scope='col' style={{ color: '#404040' }}>Ganancias de la empresa (Q)</th>
                    <th scope='col' style={{ color: '#404040' }}>Ganancias de repartidor (Q)</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                {data3Tb1.map((item, index) => (
                    <tr key={index}>
                    <td>
                    <MDBBadge color='warning' pill>
                    {item.nombre}
                        </MDBBadge>
                    </td>
                    <td>
                    {item.calificacionRepartidor}
                    </td>
                    <td>
                    {item.PedidosRealizados}
                    </td>
                    <td>
                    {"Q "+item.GananciasTotalesEmpresa}
                    </td>
                    <td>
                    {"Q "+item.GananciasRepartidor}
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
  

export default Reportes;
