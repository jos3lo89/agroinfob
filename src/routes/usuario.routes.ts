import { Router } from "express";

// mis imports
import { UsuarioController } from "../controllers/usuario.controller";
import { UsuarioMiddleware } from "../middlewares/usuario.middleware";
import { UsuarioSchemas } from "../schemas/usuario.schema";
import { FilesValidator, Validator } from "../middlewares/validator.middleware";
import { Multer } from "../middlewares/multer.middleware";

const router = Router();

// POST registrar
router.post(
  "/usuario/registrar",
  UsuarioMiddleware.schemaValidation(UsuarioSchemas.usuarioRegisterSchema()),
  UsuarioController.registrar
);

// POST login
router.post(
  "/usuario/login",
  UsuarioMiddleware.schemaValidation(UsuarioSchemas.usuarioLoginSchema()),
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

// PUT actualizar datos
router.put(
  "/usuario/actualizar-datos",
  Validator.validateAuth,
  UsuarioMiddleware.schemaValidation(UsuarioSchemas.usuarioActualizarSchema()),
  UsuarioController.actualizarDatos
);

// PUT actualizar clave
router.put(
  "/usuario/actualizar-clave",
  Validator.validateAuth,
  UsuarioMiddleware.schemaValidation(
    UsuarioSchemas.usuarioActualizarClaveSchema()
  ),
  UsuarioController.actualizarClave
);

// POST agregar foto de usuario
router.post(
  "/usuario/agregar-foto",
  Validator.validateAuth,
  Multer.uploadSingle("foto"),
  FilesValidator.validateFile,
  UsuarioController.agregarFoto
);

// DELETE eliminar foto de usuario
router.delete(
  "/usuario/eliminar-foto",
  Validator.validateAuth,
  UsuarioController.eliminarFoto
);

// PUT actualizar foto de usuario
router.put(
  "/usuario/actualizar-foto",
  Validator.validateAuth,
  Multer.uploadSingle("foto"),
  FilesValidator.validateFile,
  UsuarioController.actualizarFoto
);

// DELETE eliminar usuario
router.delete(
  "/usuario/eliminar",
  Validator.validateAuth,
  UsuarioController.eliminar
);


// POST agregar telefono de usuario
router.post(
  "/usuario/agregar-telefono",
  Validator.validateAuth,
  UsuarioMiddleware.schemaValidation(UsuarioSchemas.usuarioAgregarTelefonoSchema()),
  UsuarioController.agregarTelefono
);

export default router;
