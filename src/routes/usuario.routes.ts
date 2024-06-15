import { Router } from "express";

// mis imports
import { UsuarioController } from "../controllers/usuario.controller";
import { UsuarioMiddleware } from "../middlewares/usuario.middleware";
import { UsuarioSchemas } from "../schemas/usuario.schema";
import { Validator } from "../middlewares/validator.middleware";

const router = Router();

// POST registrar
router.post(
  "/usuario/registrar",
  UsuarioMiddleware.schemaValidation(UsuarioSchemas.getUsuarioRegisterSchema()),
  UsuarioController.registrar
);

// POST login
router.post(
  "/usuario/login",
  UsuarioMiddleware.schemaValidation(UsuarioSchemas.getUsuarioLoginSchema()),
  UsuarioController.login
);

// GET datos de usuario
router.get(
  "/usuario/datos",
  Validator.validateAuth,
  UsuarioController.getUsuarioDatos
);

// LOGOUT
router.post(
  "/usuario/logout",
  Validator.validateAuth,
  UsuarioController.logOut
);

export default router;
