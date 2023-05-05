import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import indexRoutes from "./routes/index.routes.js";
import javierRoutes4 from "./routes/javier.routes4.js";
import javierRoutes6 from "./routes/javier.routes6.js";
import javierRoutes10 from "./routes/javier.routes10.js";
import javierRoutes100 from "./routes/javier.routes100.js";
import javierRoutes101 from "./routes/javier.routes101.js";
import javierRoutes102 from "./routes/javier.routes102.js";
import carenroutes from "./routes/caren.routes.js";
import luisroutes from "./routes/luis.routes.js";
import isabelRoutes from './routes/isabel.routes.js';

const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

//Cors
var corsOptions = {
  origin: '*',
};

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/", indexRoutes);
//-----------
app.use("/", javierRoutes4);
app.use("/", javierRoutes6);
app.use("/", javierRoutes10);
app.use("/", javierRoutes100);
app.use("/", javierRoutes101);
app.use("/", javierRoutes102);
app.use("/", carenroutes);
app.use("/",luisroutes);
app.use("/", isabelRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;