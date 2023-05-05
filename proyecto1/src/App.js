import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Navigation from './components/navigation/navigation';
import RegistroUsuario from './components/registro/registroUsuario';
import RegistroRepartidor from './components/registro/registroRepartidor';
import RegistroEmpresa from './components/registro/registroEmpresa';
import PerfilRepartidor from './components/repartidor/perfilRepartidor';
import PedidosRepartidor from './components/repartidor/pedidosRepartidor';
import Login from './components/login/login';
import RegistroProductos from './components/productos/registroProductos';
import Home from './components/Home/Home';
import SolicitudesUsuarios from './components/SolicitudesUsuarios/SolicitudesUsuarios';
import DeshabilitarCuentas from './components/DeshabilitarCuentas/DeshabilitarCuentas';
import HistorialPedidos from './components/HistorialPedidos/HistorialPedidos';
import PanelControlProductos from './components/PanelControlProductos/PanelControlProductos';
import Categorias from './components/usuario/categorias';
import Admin from './components/registro/admin';
import Empresas from './components/usuario/empresas';
import Productos from './components/usuario/productos';
import VerProductosEmpresa from './components/PanelControlProductos/VerProductosEmpresa';
import Reportes from './components/Reportes/reportesAdmin';

function App() {
  return (
    <div className="App">
      <Navigation/>
        <Routes>
          {/* Rutas para cada página */} 
          <Route path='/' element={< Login/>}  />
          <Route path='/login' element={< Login/>}  />
          <Route path='/registroUsuario' element={< RegistroUsuario/>}  />
          <Route path='/registroRepartidor' element={< RegistroRepartidor/>}  />
          <Route path='/registroEmpresa' element={< RegistroEmpresa/>}  />
          <Route path='/perfilRepartidor/:repartidorId' element={< PerfilRepartidor/>}  />
          <Route path='/pedidosRepartidor/:repartidorId' element={< PedidosRepartidor/>}  />
          <Route path='/registroProductos' element={< RegistroProductos/>}  />
          <Route path='/categorias' element={< Categorias/>}  />
          <Route path="/home" element={<Home/>} />
          <Route path="/solicitudes" element={<SolicitudesUsuarios/>} />
          <Route path="/deshabilitar" element={<DeshabilitarCuentas/>} />
          <Route path="/historialPedidos" element={<HistorialPedidos/>} />
          <Route path="/panelControl" element={<PanelControlProductos/>} />
          <Route path="/productosEmpresa" element={<VerProductosEmpresa/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path='/empresasProducto/:nombre' element={< Empresas/>}  />
          <Route path='/productos/:idEmpresa' element={< Productos/>}  />
          <Route path='/reportesAdmin' element={< Reportes/>}  />
        </Routes>      
    </div>
  );
}

export default App;
