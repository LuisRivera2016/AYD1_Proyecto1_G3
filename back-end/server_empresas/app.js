import express from "express";
import morgan from "morgan";
import cors from "cors";

import indexRoutes from "./routes/index.routes.js";
import javierRoutes1 from "./routes/javier.routes1.js";
/*import javierRoutes2 from "./routes/javier.routes2.js";*/
import javierRoutes3 from "./routes/javier.routes3.js";
import javierRoutes5 from "./routes/javier.routes5.js";
import javierRoutes7 from "./routes/javier.routes7.js";
import javierRoutes8 from "./routes/javier.routes8.js";
import javierRoutes9 from "./routes/javier.routes9.js";
import javierRoutes10 from "./routes/javier.routes10.js";
import carenroutes from "./routes/caren.routes.js";
import isabelRoutes from "./routes/isabel.routes.js";

const app = express();

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
app.use("/", javierRoutes1);
/*app.use("/", javierRoutes2);*/
app.use("/", javierRoutes3);
app.use("/", javierRoutes5);
app.use("/", javierRoutes7);
app.use("/", javierRoutes8);
app.use("/", javierRoutes9);
app.use("/", javierRoutes10);
app.use("/", carenroutes);
app.use("/", isabelRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;