import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import axios from "axios";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config/config.js";

const SECRET_KEY = "my-secret-key";

async function executeQuery(sql) {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
  });
  const [rows, _] = await connection.execute(sql);
  connection.end();

  return rows;
}

function getUrl(baseURL, endpoint) {
  let res = "";
  let user = [
    "/getUsuariosEnEspera",
    "/ActivarUsuario",
    "/historialPedidoUsuario",
    "/RechazarUsuario",
    "/ObtenerCategorias",
    "/ObtenerDepartamentos",
    "/ObtenerMunicipiosxDepto",
    "/ObtenerEmpresasPorCategorias",
    "/ObtenerProductosPorEmpresa",
    "/AceptarPedido"
  ];
  let admin = [
    "/userDisable", 
    "/companyDisable",
    "/getUsers",
    "/getCompany",
    "/getAdminAllReports",
    "/getAdminAllReports2",
    "/getAdminAllReports3",
    "/getRepartidor"
  ];
  let repartidor = [
    "/orderStatusChange",
    "/getUsuariosEnEsperaR",
    "/ActivarUsuarioR",
    "/listaSolicitudes",
    "/info-repartidor",
    "/listaPedidosAsignados",
    "/historialPedidoRepartidor",
    "/RechazarUsuarioR",
    "/info-repartidor"
  ];
  let empresa = [
    "/addCategoryProduct",
    "/getCategoriaProducto",
    "/createProducto",
    "/getEmpresaEnEspera",
    "/ActivarEmpresa",
    "/actualizarProducto",
    "/getAllProducts",
    "/RechazarEmpresa",
  ];

  let server, port;

  if (user.includes(baseURL)) {
    server = process.env.SERV_USER || "localhost";
    port = process.env.PORT_USER || 6000;
    res = `${server}:${port}${endpoint}`;
  } else if (admin.includes(baseURL)) {
    server = process.env.SERV_ADMIN || "localhost";
    port = process.env.PORT_ADMIN || 6000;
    res = `${server}:${port}${endpoint}`;
  } else if (repartidor.includes(baseURL)) {
    server = process.env.SERV_REPART || "localhost";
    port = process.env.PORT_REPART || 5000;
    res = `${server}:${port}${endpoint}`;
  } else if (empresa.includes(baseURL)) {
    server = process.env.SERV_EMPR || "localhost";
    port = process.env.PORT_EMPR || 7000;
    res = `${server}:${port}${endpoint}`;
  }

  console.log(res);
  return res;
}

async function setLog(method, input, output, err) {
  /*
  console.log(
    `Method: ${method}`,
    `Input: ${JSON.stringify(input)}`,
    `Output: ${JSON.stringify(output)}`,
    `Err ${err}`
  );/*
  executeQuery(
    `INSERT INTO bitacora (method_middleware, input, output, err) VALUES ('${method}', '${
      JSON.stringify(input).length > 250
        ? JSON.stringify(input).substring(0, 250)
        : JSON.stringify(input)
    }', '${
      JSON.stringify(output).length > 150
        ? JSON.stringify(output).substring(0, 150)
        : JSON.stringify(output)
    }', ${err})`
  )
    .then((result) => {
      console.log(result);
      console.log("Consulta realizada exitosamente!");
    })
    .catch((error) => {
      console.log(error);
    });*/
}

export const login = async (req, res) => {
  executeQuery(
    `SELECT u.id_usuario AS id, u.estado, u.correo AS email, r.nombre AS rol 
    FROM Usuario u 
    INNER JOIN Rol r 
    ON r.id_rol = u.id_rol 
    WHERE correo = '${req.body.username}' AND password = '${req.body.password}' 
    UNION 
    SELECT id_empresa AS id,estado, correo AS email, 'Empresa' AS rol 
    FROM Empresa 
    WHERE correo = '${req.body.username}' AND password = '${req.body.password}';`
  )
    .then((results) => {
      if (results.length > 0) {
        const token = jwt.sign(
          {
            id: results[0].id,
            email: results[0].email,
            rol: results[0].rol,
            estado: results[0].estado,
          },
          SECRET_KEY,
          {
            expiresIn: "30m",
          }
        );
        res.status(200).json({ token });
      } else {
        res.status(401);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

export const register = async (req, res) => {
  const method_middleware = req.originalUrl;
  const server = process.env.SERV_REPART || "localhost";
  const port = req.body.type === "empresa" ? 7000 : 6000;
  const endpoint =
    req.body.type === "empresa" ? "/RegistarEmpresa" : "/RegistarUsuario";
  const URL = `${server}:${port}${endpoint}`;
  const typeMethod = req.method;

  try {
    switch (typeMethod) {
      case "POST":
        await axios
          .post(`http://${URL}`,  req.body)
          .then((resp) => {
            console.log("resp:" + resp.data);
            setLog(method_middleware, req.body, resp.data, false);
            res.status(resp.status).json(resp.data);
          })
          .catch((err) => {
            setLog(method_middleware, req.body, err.response, true);
            res.status(500);
          });
        break;
      default:
        res.status(400).json({ data: "Not supported method" });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ data: "Server error" });
  }
};

export const validateUrl = async (req, res, next) => {
  // Primero se verifica que el token sea válido
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;

    jwt.verify(req.token, SECRET_KEY, (err, _) => {
      if (err) {
        req.headers.result = false;
      } else {
        req.headers.result = true;
      }
    });
  } else {
    req.headers.result = false;
  }

  // Luego se valida el endpoint que se desea consumir
  const method_middleware = req.originalUrl;
  const base_url = req._parsedUrl.pathname;
  console.log(req.headers.result);
  if (req.headers.result) {
    const typeMethod = req.method;
    const URL = getUrl(base_url, method_middleware);
    try {
      switch (typeMethod) {
        case "GET":
          await axios
            .get(`http://${URL}`, req.query)
            .then((resp) => {
              setLog(method_middleware, req.body, resp.data, false);
              res.status(resp.status).json(resp.data);
              next();
            })
            .catch((err) => {
              console.log(err);
              setLog(method_middleware, req.body, err.response, true);
              res.status(500).json(err.response.data);
              next(err);
            });
          break;
        case "POST":
          await axios
            .post(`http://${URL}`, req.body)
            .then((resp) => {
              console.log("resp:" + resp.data);
              setLog(method_middleware, req.body, resp.data, false);
              res.status(resp.status).json(resp.data);
              next();
            })
            .catch((err) => {
              setLog(method_middleware, req.body, err.response, true);
              res.status(err.response.status).json(err.response.data);
              next(err);
            });
          break;
        default:
          res.status(400).json({ data: "Not supported method" });
          next();
      }
    } catch (err) {
      res.status(500).json({ data: "Server error" });
      next(err);
    }
  } else {
    res.status(401).json({ data: "Unauthorized" });
    next();
  }
};
