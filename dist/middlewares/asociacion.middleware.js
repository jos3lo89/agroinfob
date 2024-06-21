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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsociacionMiddleware = void 0;
const zod_1 = require("zod");
const fs = __importStar(require("node:fs/promises"));
const asociacion_model_1 = require("../models/asociacion.model");
class AsociacionMiddleware {
    static validarOneAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { admin_id } = req.body;
                if (!admin_id) {
                    throw new Error("No hay admin_id");
                }
                const foundAsociacion = yield asociacion_model_1.AsociacionModel.buscarAsocIdAdmin(admin_id);
                if (!foundAsociacion) {
                    next();
                }
                else {
                    throw new Error("Este usuario ya tiene una asociacion");
                }
            }
            catch (error) {
                if (req.file) {
                    yield fs.unlink(`./public/uploads/${req.file.filename}`);
                }
                return res.status(400).json({ message: [error.message] });
            }
        });
    }
}
exports.AsociacionMiddleware = AsociacionMiddleware;
_a = AsociacionMiddleware;
AsociacionMiddleware.schemaValidation = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = Object.assign({}, req.body);
        schema.parse(body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            if (req.file) {
                yield fs.unlink(`./public/uploads/${req.file.filename}`);
            }
            return res
                .status(400)
                .json({ message: error.errors.map((e) => e.message) });
        }
    }
});
