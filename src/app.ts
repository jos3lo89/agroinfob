import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";


// mis imports
import { config } from "./config/config";
import routerUsuario from "./routes/usuario.routes";

const app = express();

app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use(cookieParser());

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// rutas de usuarios
app.use("/api", routerUsuario);
// rutas de asociacion

export default app;
