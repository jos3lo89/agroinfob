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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesValidator = exports.Validator = void 0;
const config_1 = require("../config/config");
const jwt_1 = require("../utils/jwt");
const fs = __importStar(require("node:fs/promises"));
class Validator {
    static validateAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies.token;
                if (!token) {
                    throw new Error("No hay token");
                }
                if (!config_1.config.jwtSecret) {
                    throw new Error("No se ha configurado el secreto de JWT");
                }
                const decoded = (yield jwt_1.Jwt.verify(token));
                req.user = decoded;
                next();
            }
            catch (error) {
                return res.status(401).json({ message: [error.message] });
            }
        });
    }
    static adminValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const rol = (_a = req.user) === null || _a === void 0 ? void 0 : _a.rol;
                if (!rol) {
                    throw new Error("No hay rol autenticado");
                }
                if (rol !== "administrador") {
                    throw new Error("No tines acceso");
                }
                next();
            }
            catch (error) {
                return res.status(401).json({ message: [error.message] });
            }
        });
    }
    static adminAsocValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const rol = (_a = req.user) === null || _a === void 0 ? void 0 : _a.rol;
                if (!rol) {
                    throw new Error("No hay rol autenticado");
                }
                if (rol !== "adminAsociacion") {
                    throw new Error("No tines acceso");
                }
                next();
            }
            catch (error) {
                return res.status(401).json({ message: [error.message] });
            }
        });
    }
}
exports.Validator = Validator;
class FilesValidator {
    static validateFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                if (!file) {
                    throw new Error("No se ha enviado el archivo");
                }
                if (!file.mimetype.match(/jpeg|jpg|png|webp/)) {
                    yield fs.unlink(`./public/uploads/${file.filename}`);
                    throw new Error("Sólo se permiten imágenes de tipo jpeg, jpg, png y webp.");
                }
                next();
            }
            catch (error) {
                return res.status(400).json({ message: [error.message] });
            }
        });
    }
}
exports.FilesValidator = FilesValidator;
