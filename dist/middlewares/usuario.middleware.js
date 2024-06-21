"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioMiddleware = void 0;
const zod_1 = require("zod");
class UsuarioMiddleware {
}
exports.UsuarioMiddleware = UsuarioMiddleware;
UsuarioMiddleware.schemaValidation = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res
                .status(400)
                .json({ message: error.errors.map((e) => e.message) });
        }
    }
};
