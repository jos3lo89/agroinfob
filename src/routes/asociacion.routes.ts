import { Router } from "express";

// mis imports
import { AsociacionController } from "../controllers/asociacion.controller";
import { AsociacionMiddleware } from "../middlewares/asociacion.middleware";
import { AsociacionSchemas } from "../schemas/asociacion.schema";
// auth
import { FilesValidator, Validator } from "../middlewares/validator.middleware";
import { Multer } from "../middlewares/multer.middleware";
// validar schema

const router = Router();

// POST registrar
router.post(
  "/asociacion/registrar",
  Validator.validateAuth,
  Validator.adminValidator,
  Multer.uploadSingle("portada"),
  FilesValidator.validateFile,
  AsociacionMiddleware.schemaValidation(
    AsociacionSchemas.asociacionRegisterSchema()
  ),
  AsociacionMiddleware.validarOneAdmin,
  AsociacionController.registrar
);

// GET datos de asociacion
router.get("/asociacion/datos/:nombre", AsociacionController.getAsociacionDatos);

// GET - peddir datos en adminAsoc
router.get(
  "/asociacion/datos-admin",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  AsociacionController.getDatosAscoAdmin
);

// GET - listar slider asociacion incio
router.get("/asociacion/lista-inicio", AsociacionController.listarAsoc);

export default router;
