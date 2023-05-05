import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmojiFoodBeverage } from 'react-icons/md';
import Card from 'react-bootstrap/Card';
import logo from './holder.png'; // Tell webpack this JS file uses this image
import { useParams } from 'react-router-dom';


function Empresas() {
    const ApiUrl = "http://127.0.0.1:4500"
    const [validated, setValidated] = useState(false);
    let navigate = useNavigate();
    const [empresas, setEmpresas] = useState([]);
    let token = localStorage.getItem("token");
    const { nombre } = useParams();

    useEffect(() => {
        let data = {}
        data.NombreCategoria = nombre;

        let requestOptionsPOST = { 
            method: "POST", 
            headers: { "Content-Type": "application/json",  'Authorization': `Bearer ${token}` }, 
            credentials: "same-origin",
            body: JSON.stringify(data)
        }

        fetch(`${ApiUrl}/ObtenerEmpresasPorCategorias`, requestOptionsPOST)
        .then((response) => { 
            return response.json().then((data) => {
                console.log(data)
                setEmpresas(data.Empresas);
                console.log(empresas)
            }).catch((err) => {
                console.log(err);
            }) 
        });
      }, []);
  
    return (
    <Container >
        <h2>Empresas</h2>

        <Container>
            <Row xs={4} sm={4} md={4} lg={4} className="g-4">
                {empresas.map( (item, index) => {
                return (
                    <Col key={index}>
                        <Card value={item.nombre} style={{ width: '10rem' }}>
                            <Card.Img variant="top" src={logo}/>
                            <Card.Body>
                                <Card.Title>
                                    <Link  to={`/productos/${item.nombre}`} style={{ textDecoration: 'none' }}>
                                        <Button variant="btn btn-link" type="button">{item.nombre}</Button>
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

export default Empresas;