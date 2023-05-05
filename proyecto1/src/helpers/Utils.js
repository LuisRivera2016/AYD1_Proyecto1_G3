const ApiUrl = "http://127.0.0.1:4500"

//Buscar pelicula por nombre
export const registrar = (usuario) => {
  let requestOptionsPOST = { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({
        Nombre:usuario.Nombre,
        Apellido:usuario.Apellido,
        Correo:usuario.Correo,
        Contrasena:usuario.Contrasena,
        Telefono:usuario.Telefono,
        Estado:usuario.Estado,
        UrlCv:usuario.UrlCv,
        TipoLicencia:usuario.TipoLicencia,
        Vehiculo:usuario.Vehiculo,
        IdMunicipio:usuario.IdMunicipio,
        idRol:usuario.idRol
      }),
      credentials: "same-origin",
  }

  fetch(`${ApiUrl}/RegistarUsuario`,requestOptionsPOST)
  .then(response => {
    return response.json()}).then((data) => {

  }).catch((error) => {
      console.error(error.message)
  });
}; 