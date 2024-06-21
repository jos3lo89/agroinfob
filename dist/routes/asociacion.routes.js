"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// mis imports
const asociacion_controller_1 = require("../controllers/asociacion.controller");
const asociacion_middleware_1 = require("../middlewares/asociacion.middleware");
const asociacion_schema_1 = require("../schemas/asociacion.schema");
// auth
const validator_middleware_1 = require("../middlewares/validator.middleware");
const multer_middleware_1 = require("../middlewares/multer.middleware");
// validar schema
const router = (0, express_1.Router)();
// POST registrar
router.post("/asociacion/registrar", validator_middleware_1.Validator.validateAuth, validator_middleware_1.Validator.adminValidator, multer_middleware_1.Multer.uploadSingle("portada"), validator_middleware_1.FilesValidator.validateFile, asociacion_middleware_1.AsociacionMiddleware.schemaValidation(asociacion_schema_1.AsociacionSchemas.asociacionRegisterSchema()), asociacion_middleware_1.AsociacionMiddleware.validarOneAdmin, asociacion_controller_1.AsociacionController.registrar);
exports.default = router;
