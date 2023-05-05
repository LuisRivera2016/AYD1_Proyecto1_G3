import express from "express";
import morgan from "morgan";
import cors from "cors";

// Imports de rutas
import indexRoutes from "./routes/index.routes.js";
import walterRoutes from "./routes/walter.routes.js";
import javierRoutes1 from "./routes/javier.routes1R.js";
import javierRoutes2 from "./routes/javier.routes2R.js";
import javierRoutes10 from "./routes/javier.routes10.js";
import luisroutes from "./routes/luis.routes.js";


const app = express();

//Cors
var corsOptions = {
  origin: '*',
}

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions))

// Routes
app.use("/", indexRoutes);
app.use("/", walterRoutes)
app.use("/", javierRoutes1);
app.use("/", javierRoutes2);
app.use("/", javierRoutes10);
app.use("/",luisroutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;