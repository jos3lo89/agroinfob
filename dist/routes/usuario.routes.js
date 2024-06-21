"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// mis imports
const usuario_controller_1 = require("../controllers/usuario.controller");
const usuario_middleware_1 = require("../middlewares/usuario.middleware");
const usuario_schema_1 = require("../schemas/usuario.schema");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const router = (0, express_1.Router)();
// POST registrar
router.post("/usuario/registrar", usuario_middleware_1.UsuarioMiddleware.schemaValidation(usuario_schema_1.UsuarioSchemas.usuarioRegisterSchema()), usuario_controller_1.UsuarioController.registrar);
// POST login
router.post("/usuario/login", usuario_middleware_1.UsuarioMiddleware.schemaValidation(usuario_schema_1.UsuarioSchemas.usuarioLoginSchema()), usuario_controller_1.UsuarioController.login);
// GET datos de usuario
router.get("/usuario/datos", validator_middleware_1.Validator.validateAuth, usuario_controller_1.UsuarioController.getUsuarioDatos);
// LOGOUT
router.post("/usuario/logout", validator_middleware_1.Validator.validateAuth, usuario_controller_1.UsuarioController.logOut);
// PUT actualizar datos
router.put("/usuario/actualizar-datos", validator_middleware_1.Validator.validateAuth, usuario_middleware_1.UsuarioMiddleware.schemaValidation(usuario_schema_1.UsuarioSchemas.usuarioActualizarSchema()), usuario_controller_1.UsuarioController.actualizarDatos);
// PUT actualizar clave
router.put("/usuario/actualizar-clave", validator_middleware_1.Validator.validateAuth, usuario_middleware_1.UsuarioMiddleware.schemaValidation(usuario_schema_1.UsuarioSchemas.usuarioActualizarClaveSchema()), usuario_controller_1.UsuarioController.actualizarClave);
// POST agregar foto de usuario
router.post("/usuario/agregar-foto", validator_middleware_1.Validator.validateAuth, multer_middleware_1.Multer.uploadSingle("foto"), validator_middleware_1.FilesValidator.validateFile, usuario_controller_1.UsuarioController.agregarFoto);
// DELETE eliminar foto de usuario
router.delete("/usuario/eliminar-foto", validator_middleware_1.Validator.validateAuth, usuario_controller_1.UsuarioController.eliminarFoto);
// PUT actualizar foto de usuario
router.put("/usuario/actualizar-foto", validator_middleware_1.Validator.validateAuth, multer_middleware_1.Multer.uploadSingle("foto"), validator_middleware_1.FilesValidator.validateFile, usuario_controller_1.UsuarioController.actualizarFoto);
// DELETE eliminar usuario
router.delete("/usuario/eliminar", validator_middleware_1.Validator.validateAuth, usuario_controller_1.UsuarioController.eliminar);
// POST agregar telefono de usuario
router.post("/usuario/agregar-telefono", validator_middleware_1.Validator.validateAuth, usuario_middleware_1.UsuarioMiddleware.schemaValidation(usuario_schema_1.UsuarioSchemas.usuarioAgregarTelefonoSchema()), usuario_controller_1.UsuarioController.agregarTelefono);
exports.default = router;
