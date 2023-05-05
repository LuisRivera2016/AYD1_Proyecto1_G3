import React, { useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import CarritoCompras from "../CarritoCompras/CarritoCompras";
import config from '../../config';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Home() {

  const [empresas, setEmpresas] = useState([])

  useEffect(() => {

    // ------------------ Obtener Categorias ------------------ 
    console.log(`${config.apiUrlEmpresas}/getEmpresas`)
    fetch(`${config.apiUrlEmpresas}/getEmpresas`,config.requestOptionsGET)
    .then(response => {
        if (!response.ok) {
            console.error(response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data)
        setEmpresas(data)
    }) 
    .catch((error) => {
        console.error(error.message)
    });

}, []);

const getSelectedProduct = (event) => {
  if (empresas.length > 0 ) {
      const id_producto = parseInt(event.target.value);
      //const productoEncontrado = productos.find(producto => producto.id_producto === id_producto );
     // setSelectedProduct(productoEncontrado);
      //setSrcFoto(productoEncontrado.foto)
      //setIndexForm(indexForm + 1); //Para forzar el renderizado del form
      //console.log(productoEncontrado.id_categoria)
      //document.getElementById('cmbCategoria').value = productoEncontrado.id_categoria
  }
}



  return (
    <div style={{padding:20}}>

        <Row style={{margin:'20px 10px 30px 0px'}}>                 
            <Form.Label>Empresa: </Form.Label>
            <Form.Select id='cmbProducto' defaultValue="-2" onChange={getSelectedProduct}>
                <option value="-2" disabled>Seleccione una empresa</option>
                {empresas.map((product,index) => (
                    <   option key={index} 
                        value={product.id_empresa}                        
                    >  {product.nombre} </option>
                ))}
            </Form.Select>  
        </Row>
      
      <CarritoCompras style={{position:'relative',height:'80vh' }}/>
    </div>
  );
}

export default Home;
