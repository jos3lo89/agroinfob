"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const fs = __importStar(require("node:fs/promises"));
// mis imports
const usuario_model_1 = require("../models/usuario.model");
const jwt_1 = require("../utils/jwt");
const config_1 = require("../config/config");
class UsuarioController {
    static registrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, apellido, correo, clave } = req.body;
                const hashedClave = yield bcryptjs_1.default.hash(clave, 10);
                const newUsuario = yield usuario_model_1.Usuario.create({
                    nombre,
                    apellido,
                    correo,
                    clave: hashedClave,
                });
                res.status(201).json(newUsuario);
            }
            catch (error) {
                console.log(error.message);
                return res.status(400).json({ message: [error.message] });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { correo, clave } = req.body;
                const userfound = yield usuario_model_1.Usuario.buscarUsuario(correo);
                if (!userfound) {
                    throw new Error("El usuario no existe");
                }
                const isMatch = yield bcryptjs_1.default.compare(clave, userfound.clave);
                if (!isMatch) {
                    throw new Error("La clave no es válida");
                }
                const token = yield jwt_1.Jwt.create({
                    id: userfound.id,
                    correo: userfound.correo,
                    rol: userfound.rol,
                });
                res.cookie("token", token, {
                    httpOnly: false,
                    secure: true,
                    sameSite: "none",
                });
                res.status(200).json({
                    id: userfound.id,
                    nombre: userfound.nombre,
                    apellido: userfound.apellido,
                    correo: userfound.correo,
                    foto: userfound.foto
                        ? `${config_1.config.serverUrl}${userfound.foto}`
                        : userfound.foto,
                    rol: userfound.rol,
                    fechaCreacion: userfound.fechaCreacion,
                    fechaActualizacion: userfound.fechaActualizacion,
                });
            }
            catch (error) {
                console.log(error.message);
                return res.status(400).json({ message: [error.message] });
            }
        });
    }
    static getUsuarioDatos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const correo = (_a = req.user) === null || _a === void 0 ? void 0 : _a.correo;
                if (!correo) {
                    throw new Error("No hay usuario autenticado");
                }
                const userfound = yield usuario_model_1.Usuario.buscarUsuario(correo);
                if (!userfound) {
                    throw new Error("El usuario no existe");
                }
                res.status(200).json({
                    id: userfound.id,
                    nombre: userfound.nombre,
                    apellido: userfound.apellido,
                    correo: userfound.correo,
                    foto: userfound.foto
                        ? `${config_1.config.serverUrl}${userfound.foto}`
                        : userfound.foto,
                    foto_id: userfound.foto_id
                        ? `${config_1.config.serverUrl}${userfound.foto_id}`
                        : userfound.foto_id,
                    rol: userfound.rol,
                    telefonos: userfound.telefonos,
                    fechaCreacion: userfound.fechaCreacion,
                    fechaActualizacion: userfound.fechaActualizacion,
                });
            }
            catch (error) {
                console.log(error.message);
                return res.status(400).json({ message: [error.message] });
            }
        });
    }
    static logOut(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("token");
                res.sendStatus(204);
            }
            catch (error) {
                console.log(error.message);
                return res.status(400).json({ message: [error.message] });
            }
        });
    }
    static actualizarDatos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const correo = (_a = req.user) === null || _a === void 0 ? void 0 : _a.correo;
                const { nombre, apellido } = req.body;
                if (!correo) {
                    throw new Error("No hay usuario autenticado");
                }
                const userfound = yield usuario_model_1.Usuario.buscarUsuario(correo);
                if (!userfound) {
                    throw new Error("El usuario no existe");
                }
                const userUpdated = yield usuario_model_1.Usuario.actualizarDatosUsuario({
                    correo: correo,
                    nombre: nombre,
                    apellido: apellido,
                });
                res.status(200).json({
                    nombre: userUpdated.nombre,
                    apellido: userUpdated.apellido,
                });
            }
            catch (error) {
                console.log(error.message);
                return res.status(400).json({ message: [error.message] });
            }
        });
    }
    static actualizarClave(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const correo = (_a = req.user) === null || _a === void 0 ? void 0 : _a.correo;
                const { clave, nuevaClave } = req.body;
                if (!correo) {
                    throw new Error("No hay usuario autenticado");
                }
                const userfound = yield usuario_model_1.Usuario.buscarUsuario(correo);
                if (!userfound) {
                    throw new Error("El usuario no existe");
                }
                const isMatch = yield bcryptjs_1.default.compare(clave, userfound.clave);
                if (!isMatch) {
                    throw new Error("La clave no es válida");
                }
                const nuevaClaveHash = yield bcryptjs_1.default.hash(nuevaClave, 10);
                const userUpdated = yield usuario_model_1.Usuario.actualizarClaveUsuario({
                    correo: correo,
                    nuevaClave: nuevaClaveHash,
                });
                res.sendStatus(204);
            }
            catch (error) {
                console.log(error.message);
                return res.status(400).json({ message: [error.message] });
            }
        });
    }
    static agregarFoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const correo = (_a = req.user) === null || _a === void 0 ? void 0 : _a.correo;
                if (!correo) {
                    throw new Error("No hay usuario autenticado");
                }
                if (!req.file) {
                    throw new Error("No se ha enviado el archivo");
                }
                const userfound = yield usuario_model_1.Usuario.buscarUsuario(correo);
                if (!userfound) {
                    throw new Error("El usuario no existe");
                }
                if (userfound.foto) {
                    yield fs.unlink(`./public/uploads/${req.file.filename}`);
                    throw new Error("El usuario ya tiene una foto");
                }
                const userUpdated = yield usuario_model_1.Usuario.agregarFotoUsuario({
                    correo: correo,
                    foto: `/uploads/${req.file.filename}`,
                });
                res.status(200).json({
                    foto: `${config_1.config.serverUrl}${userUpdated.foto}`,
                });
            }
            catch (error) {
                console.log(error.message);
                return res.status(400).json({ message: [error.message] });
            }
        });
    }
    static eliminarFoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const correo = (_a = req.user) === null || _a === void 0 ? void 0 : _a.correo;
                if (!correo) {
                    throw new Error("No hay usuario autenticado");
                }
                const userfound = yield usuario_model_1.Usuario.buscarUsuario(correo);
                if (!userfound) {
                    throw new Error("El usuario no existe");
                }
                if (!userfound.foto) {
                    throw new Error("El usuario no tiene una foto");
                }
                yield fs.unlink(`./public${userfound.foto}`);
                yield usuario_model_1.Usuario.eliminarFotoUsuario(correo);
                res.sendStatus(204);
            }
            catch (error) {
                console.log(error.message);
                return res.status(400).json({ message: [error.message] });
            }
        });
    }
    static actualizarFoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const correo = (_a = req.user) === null || _a === void 0 ? void 0 : _a.correo;
                if (!req.file) {
                    throw new Error("No se ha enviado el archivo");
                }
                if (!correo) {
                    throw new Error("No hay usuario autenticado");
                }
                const userfound = yield usuario_model_1.Usuario.buscarUsuario(correo);
                if (!userfound) {
                    throw new Error("El usuario no existe");
                }
                if (!userfound.foto) {
                    yield fs.unlink(`./public/uploads/${req.file.filename}`);
                    throw new Error("El usuario no tiene una foto");
                }
                yield fs.unlink(`./public${userfound.foto}`);
                const userUpdated = yield usuario_model_1.Usuario.actualizarFotoUsuario({
                    correo: correo,
                    foto: `/uploads/${req.file.filename}`,
                });
                res.status(200).json({
                    foto: `${config_1.config.serverUrl}${userUpdated.foto}`,
                });
            }
            catch (error) {
                console.log(error.message);
                return res.status(400).json({ message: [error.message] });
            }
        });
    }
    static eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const correo = (_a = req.user) === null || _a === void 0 ? void 0 : _a.correo;
                const { clave } = req.body;
                if (!clave) {
                    throw new Error("Clave no enviada");
                }
                if (!correo) {
                    throw new Error("No hay usuario autenticado");
                }
                const userfound = yield usuario_model_1.Usuario.buscarUsuario(correo);
                if (!userfound) {
                    throw new Error("El usuario no existe");
                }
                const isMatch = yield bcryptjs_1.default.compare(clave, userfound.clave);
                if (!isMatch) {
                    throw new Error("La clave no coincide");
                }
                if (userfound.foto) {
                    yield fs.unlink(`./public${userfound.foto}`);
                }
                const userDeleted = yield usuario_model_1.Usuario.eliminarUsuario(correo);
                res.sendStatus(204);
            }
            catch (error) {
                console.log(error.message);
                return res.status(400).json({ message: [error.message] });
            }
        });
    }
    static agregarTelefono(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const correo = (_a = req.user) === null || _a === void 0 ? void 0 : _a.correo;
                const usuarioId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
                const { tipo, numero } = req.body;
                if (!usuarioId) {
                    throw new Error("No hay usuario autenticado");
                }
                if (!correo) {
                    throw new Error("No hay usuario autenticado");
                }
                const userfound = yield usuario_model_1.Usuario.buscarUsuario(correo);
                if (!userfound) {
                    throw new Error("El usuario no existe");
                }
                if (userfound.telefonos.length >= 2) {
                    throw new Error("El usuario ya tiene dos telefonos");
                }
                if (!numero) {
                    throw new Error("No hay tipo o numero de telefono");
                }
                if (tipo !== "movil" && tipo !== "fijo") {
                    throw new Error("Tipo de telefono no valido");
                }
                const telefono = yield usuario_model_1.Usuario.agregarTelefonoUsuario({
                    usuarioId,
                    tipo,
                    numero,
                });
                res.status(201).json(telefono);
            }
            catch (error) {
                console.log(error.message);
                return res.status(400).json({ message: [error.message] });
            }
        });
    }
}
exports.UsuarioController = UsuarioController;
