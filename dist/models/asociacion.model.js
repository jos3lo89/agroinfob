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
exports.AsociacionModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class AsociacionModel {
    static crearAsociacion(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const asociacion = yield database_1.default.asociaciones.create({
                    data: {
                        admin_id: data.admin_id,
                        nombre: data.nombre,
                        descripcion: data.descripcion,
                        portada: data.portada,
                        portada_id: null,
                    },
                });
                yield database_1.default.telefonosAsociacion.create({
                    data: {
                        asociacion_id: asociacion.id,
                        numero: data.numero,
                        tipo: data.tipo,
                    },
                });
                return asociacion;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static buscarAsocIdAdmin(idAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const asociacion = yield database_1.default.asociaciones.findFirst({
                    where: {
                        admin_id: idAdmin,
                    },
                });
                return asociacion;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.AsociacionModel = AsociacionModel;
