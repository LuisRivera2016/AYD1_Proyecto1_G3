const config = {
    url:"http://localhost",
    port_server_empresas   : ":4500",
    port_server_middleware : ":4500",
    port_server_repartidor : ":4500",
    port_server_usuarios   : ":4500",
};
  
export default {
    apiUrlEmpresas   : `${config.url}${config.port_server_empresas}`,
    apiUrlMiddleware : `${config.url}${config.port_server_middleware}`,
    apiUrlRepartidor : `${config.url}${config.port_server_repartidor}`,
    apiUrlUsuarios   : `${config.url}${config.port_server_usuarios}`,
    requestOptionsPOST : { 
        method: "POST", 
        headers: {  "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: {},
        credentials: "same-origin",
    },
    requestOptionsGET : {
        method: 'GET',
        headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` },
        credentials: 'same-origin'
    },
};