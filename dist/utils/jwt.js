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
exports.Jwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
class Jwt {
    static create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (config_1.config.jwtSecret) {
                    jsonwebtoken_1.default.sign(payload, config_1.config.jwtSecret, { expiresIn: "1d" }, (err, token) => {
                        if (err)
                            reject(err);
                        resolve(token);
                    });
                }
                else {
                    reject("No se ha configurado el secreto de JWT");
                }
            });
        });
    }
    static verify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!config_1.config.jwtSecret) {
                    throw new Error("No se ha configurado el secreto de JWT");
                }
                const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
                return decoded;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.Jwt = Jwt;
