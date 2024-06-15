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
exports.UsuarioController = void 0;
const usuario_model_1 = require("../models/usuario.model");
class UsuarioController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_model_1.Usuario.create(req.body);
            res.status(201).json(usuario);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_model_1.Usuario.update(req.body);
            res.status(200).json(usuario);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_model_1.Usuario.delete(req.params.id);
            res.status(200).json(usuario);
        });
    }
}
exports.UsuarioController = UsuarioController;
