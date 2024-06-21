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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const database_1 = __importDefault(require("../config/database"));
class Usuario {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userfound = yield Usuario.buscarUsuario(data.correo);
                if (userfound) {
                    throw new Error("El correo ya existe");
                }
                const newUsuario = yield database_1.default.usuarios.create({
                    data,
                });
                return newUsuario;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static buscarUsuario(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userfound = yield database_1.default.usuarios.findFirst({
                    where: {
                        correo: correo,
                    },
                    include: {
                        telefonos: true
                    }
                });
                return userfound;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static actualizarDatosUsuario(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userUpdated = yield database_1.default.usuarios.update({
                    where: {
                        correo: data.correo,
                    },
                    data: {
                        nombre: data.nombre,
                        apellido: data.apellido,
                    },
                });
                return userUpdated;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static actualizarClaveUsuario(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userUpdated = yield database_1.default.usuarios.update({
                    where: {
                        correo: data.correo,
                    },
                    data: {
                        clave: data.nuevaClave,
                    },
                });
                return userUpdated;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static agregarFotoUsuario(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userUpdated = yield database_1.default.usuarios.update({
                    where: {
                        correo: data.correo,
                    },
                    data: {
                        foto: data.foto,
                    },
                });
                return userUpdated;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static eliminarFotoUsuario(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userUpdated = yield database_1.default.usuarios.update({
                    where: {
                        correo: correo,
                    },
                    data: {
                        foto: null,
                    },
                });
                return userUpdated;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static actualizarFotoUsuario(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userUpdated = yield database_1.default.usuarios.update({
                    where: {
                        correo: data.correo,
                    },
                    data: {
                        foto: data.foto,
                    },
                });
                return userUpdated;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static eliminarUsuario(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userUpdated = yield database_1.default.usuarios.delete({
                    where: {
                        correo: correo,
                    },
                });
                return userUpdated;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static agregarTelefonoUsuario(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const telefonoUsuario = yield database_1.default.telefonoUsuario.create({
                    data: {
                        usuario_id: data.usuarioId,
                        tipo: data.tipo,
                        numero: data.numero,
                    },
                });
                return telefonoUsuario;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.Usuario = Usuario;
