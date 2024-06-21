"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsociacionSchemas = void 0;
const zod_1 = require("zod");
class AsociacionSchemas {
    static asociacionRegisterSchema() {
        const AsociacionRegisterSchema = zod_1.z.object({
            admin_id: zod_1.z
                .string({
                required_error: "El admin_id es requerido",
                invalid_type_error: "El admin_id debe ser un string",
            })
                .min(36, {
                message: "El admin_id debe tener al menos 36 caracteres",
            }),
            nombre: zod_1.z
                .string({
                required_error: "El nombre es requerido",
                invalid_type_error: "El nombre debe ser un string",
            })
                .min(1, {
                message: "El nombre debe tener al menos un caracter",
            })
                .max(50, {
                message: "El nombre es muy largo",
            }),
            descripcion: zod_1.z
                .string({
                required_error: "La descripcion es requerida",
                invalid_type_error: "La descripcion debe ser un string",
            })
                .min(1, {
                message: "La descripcion debe tener al menos un caracter",
            }),
            numero: zod_1.z
                .string({
                required_error: "El numero es requerido",
            })
                .min(9, {
                message: "El numero debe tener al menos un caracter",
            })
                .max(15, {
                message: "El numero es muy largo",
            }),
            tipo: zod_1.z
                .string({
                required_error: "El tipo de telefono es requerido",
                invalid_type_error: "El tipo de telefono debe ser un string",
            })
                .min(1, {
                message: "El tipo de telefono debe tener al menos un caracter",
            }),
        });
        return AsociacionRegisterSchema;
    }
}
exports.AsociacionSchemas = AsociacionSchemas;
