"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsociacionController = void 0;
const asociacion_model_1 = require("../models/asociacion.model");
class AsociacionController {
    static registrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { admin_id, nombre, descripcion, numero, tipo } = req.body;
            if (!req.file) {
                throw new Error("No se ha enviado el archivo");
            }
            const asociacion = yield asociacion_model_1.AsociacionModel.crearAsociacion({
                admin_id,
                nombre,
                descripcion,
                numero,
                tipo,
                portada: `/uploads/${req.file.filename}`,
                portada_id: null,
            });
            res.status(201).json(asociacion);
            try {
            }
            catch (error) {
                console.log(error.message);
                return res.status(400).json({ message: [error.message] });
            }
        });
    }
}
exports.AsociacionController = AsociacionController;
