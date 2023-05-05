import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import placeholderImage from './product-placeholder.png'; // Tell webpack this JS file uses this image
import { useParams } from 'react-router-dom';



function Productos() {
    const ApiUrl = "http://127.0.0.1:4500"
    const [validated, setValidated] = useState(false);
    let navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    let token = localStorage.getItem("token");
    const [carrito, setCarrito] = useState([]);
    const { idEmpresa } = useParams();

    useEffect(() => {
        let data = {}
        data.idEmpresa = idEmpresa;

        let requestOptionsPOST = { 
            method: "POST", 
            headers: { "Content-Type": "application/json",  'Authorization': `Bearer ${token}` }, 
            credentials: "same-origin",
            body: JSON.stringify(data)
        }

        fetch(`${ApiUrl}/ObtenerProductosPorEmpresa`, requestOptionsPOST)
        .then((response) => { 
            return response.json().then((data) => {
                console.log(data)
                setProductos(data.Productos);
                console.log(productos)
            }).catch((err) => {
                console.log(err);
            }) 
        });
      }, []);

      function agregarProducto(item) {
        let orden = {}
        let producto = {}
        producto.id_producto = item.id_producto;
        producto.nombre = item.nombre;
        producto.descripcion = item.descripcion;
        producto.foto = item.foto;
        producto.precio = item.precio;
        producto.id_categoria = item.id_categoriaProducto;
        producto.id_empresa = idEmpresa;
        orden.producto = producto;
        orden.cantidad = 1;
        orden.personalizar = "";

        var a = [];
        a = JSON.parse(localStorage.getItem('carrito')) || [];
        a.push(orden);
        localStorage.setItem('carrito', JSON.stringify(a));
        console.log(localStorage.getItem('carrito'))
        window.location.reload();
    }

    const onImageError = (e) => {
        e.target.src = placeholderImage
    }
  
    return (
    <Container >
        <h2>Productos</h2>

        <Container>
            <Row xs={3} sm={3} md={3} lg={3} className="g-4">
                {productos.map( (item, index) => {
                return (
                    <Col key={index}>
                        <Card value={item.nombre} style={{ width: '14rem' }}>
                            <Card.Img variant="top" src={item.foto ? item.foto : placeholderImage} onError={onImageError}/>
                            <Card.Body>
                            <Card.Text>
                                {item.nombre}<br/>
                                {item.descripcion}<br/>
                                Q{item.precio}<br/>
                            </Card.Text>
                                <Card.Title>
                                    <Link   style={{ textDecoration: 'none' }}>
                                        <Button variant="btn btn-link" type="button" onClick={() => {agregarProducto(item)}}>Agregar a carrito</Button>
                                    </Link >
                                </Card.Title>
                            </Card.Body>
                        </Card>

                        <br/>
                    </Col>
                    )
                })}
            </Row>
        </Container>
    </Container>
    );
}

export default Productos;