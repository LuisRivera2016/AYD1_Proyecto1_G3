import './repartidorStyle.css';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

const ApiUrl = "http://127.0.0.1:4500"

function PerfilRepartidor (){
    const { repartidorId } = useParams();

    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [tipoLicencia, setLicencia] = useState("")
    const [vehiculo, setVehiculo] = useState("")
    const [municipio, setMunicipio] = useState("")
    const [departamento, setDepartamento] = useState("")
    const [cv, setCv] = useState("")
    const token = localStorage.getItem('token');

    useEffect(()=>{

        fetch(`${ApiUrl}/info-repartidor`, {
        method: "POST",
        body: JSON.stringify({"id_repartidor" : repartidorId}),
        headers: {"Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`
      }})
      .then(response => {return response.json()})
      .then((data) => {
         console.log(data)
         setNombre(data.data.nombre)
         setApellido(data.data.apellido)
         setEmail(data.data.correo)
         setTelefono(data.data.telefono)
         setLicencia(data.data.tipo_licencia)
         setVehiculo(data.data.vehiculo)
         setMunicipio(data.data.municipio)
         setDepartamento(data.data.departamento)
         setCv(data.data.url_cv)
      }).catch((error) => {
          console.error(error.message)
      });
      },[])
  
      return (
        <section className="vh-200" style={{ backgroundColor: '#f4f5f7' }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                <MDBRow className="g-0">
                  <MDBCol md="4" className="gradient-custom text-center text-white"
                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    <MDBCardImage src="https://cdn-icons-png.flaticon.com/512/2830/2830305.png"
                      alt="Avatar" className="my-5" style={{ width: '100px' }} fluid />
                    <MDBTypography tag="h5">{nombre + " " + apellido}</MDBTypography>
                    <MDBCardText>Repartidor</MDBCardText>
                    <MDBIcon far icon="edit mb-5" />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Información de contacto</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">{email}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Teléfono</MDBTypography>
                          <MDBCardText className="text-muted">{telefono}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="12" className="mb-3">
                          <MDBTypography tag="h6"><Link to={cv}>Curriculum (PDF)</Link></MDBTypography>
                          <MDBCardText className="text-muted"></MDBCardText>
                        </MDBCol>
                      </MDBRow>
  
                      <MDBTypography tag="h6">Transporte</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Vehiculo</MDBTypography>
                          <MDBCardText className="text-muted">{vehiculo}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Tipo de licencia</MDBTypography>
                          <MDBCardText className="text-muted">{tipoLicencia}</MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <MDBTypography tag="h6">Procedencia</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Departamento</MDBTypography>
                          <MDBCardText className="text-muted">{departamento}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Municipio</MDBTypography>
                          <MDBCardText className="text-muted">{municipio}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
  
                      <div className="d-flex justify-content-start">
                        <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                        <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                        <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
          
        );
  }
  

export default PerfilRepartidor;