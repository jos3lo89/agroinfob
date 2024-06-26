"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multer = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
class Multer {
    static getUploader() {
        const storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "./public/uploads");
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)}-${Math.floor(Math.random() * (999 - 100 + 1) + 100)}${path_1.default.extname(file.originalname)}`);
            },
        });
        return (0, multer_1.default)({
            storage,
        });
    }
    static uploadSingle(fieldName) {
        return Multer.getUploader().single(fieldName);
    }
}
exports.Multer = Multer;
