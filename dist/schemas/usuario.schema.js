"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioSchemas = void 0;
const zod_1 = require("zod");
class UsuarioSchemas {
    static usuarioRegisterSchema() {
        const UsuarioRegisterSchema = zod_1.z.object({
            nombre: zod_1.z
                .string({
                required_error: "El nombre es requerido",
                invalid_type_error: "El nombre debe ser un string",
            })
                .min(1, {
                message: "El nombre debe tener al menos un caracter",
            }),
            apellido: zod_1.z
                .string({
                required_error: "El apellido es requerido",
                invalid_type_error: "El apellido debe ser un string",
            })
                .min(1, {
                message: "El apellido debe tener al menos un caracter",
            }),
            correo: zod_1.z
                .string({
                required_error: "El correo es requerido",
                invalid_type_error: "El correo debe ser un string",
            })
                .email({
                message: "El correo no es válido",
            })
                .min(1, {
                message: "El correo debe tener al menos un caracter",
            }),
            clave: zod_1.z
                .string({
                required_error: "La clave es requerida",
                invalid_type_error: "La clave debe ser un string",
            })
                .min(6, {
                message: "La clave debe tener al menos 6 caracteres",
            }),
        });
        return UsuarioRegisterSchema;
    }
    static usuarioLoginSchema() {
        const UsuarioLoginSchema = zod_1.z.object({
            correo: zod_1.z
                .string({
                required_error: "El correo es requerido",
                invalid_type_error: "El correo debe ser un string",
            })
                .email({
                message: "El correo no es válido",
            })
                .min(1, {
                message: "El correo debe tener al menos un caracter",
            }),
            clave: zod_1.z
                .string({
                required_error: "La clave es requerida",
                invalid_type_error: "La clave debe ser un string",
            })
                .min(6, {
                message: "La clave debe tener al menos 6 caracteres",
            }),
        });
        return UsuarioLoginSchema;
    }
    static usuarioActualizarSchema() {
        const UsuarioActualizarSchema = zod_1.z.object({
            nombre: zod_1.z
                .string({
                required_error: "El nombre es requerido",
                invalid_type_error: "El nombre debe ser un string",
            })
                .min(1, {
                message: "El nombre debe tener al menos un caracter",
            })
                .max(20, {
                message: "El nombre es muy largo",
            }),
            apellido: zod_1.z
                .string({
                required_error: "El apellido es requerido",
                invalid_type_error: "El apellido debe ser un string",
            })
                .min(1, {
                message: "El apellido debe tener al menos un caracter",
            })
                .max(20, {
                message: "El apellido es muy largo",
            }),
        });
        return UsuarioActualizarSchema;
    }
    static usuarioActualizarClaveSchema() {
        const UsuarioActualizarClaveSchema = zod_1.z.object({
            clave: zod_1.z
                .string({
                required_error: "La clave es requerida",
                invalid_type_error: "La clave debe ser un string",
            })
                .min(6, {
                message: "La clave debe tener al menos 6 caracteres",
            }),
            nuevaClave: zod_1.z
                .string({
                required_error: "La nueva clave es requerida",
                invalid_type_error: "La nueva clave debe ser un string",
            })
                .min(6, {
                message: "La nueva clave debe tener al menos 6 caracteres",
            }),
        });
        return UsuarioActualizarClaveSchema;
    }
    static usuarioAgregarTelefonoSchema() {
        const UsuarioAgregarTelefonoSchema = zod_1.z.object({
            tipo: zod_1.z
                .string({
                required_error: "El tipo de telefono es requerido",
                invalid_type_error: "El tipo de telefono debe ser un string",
            })
                .min(1, {
                message: "El tipo de telefono debe tener al menos un caracter",
            }),
            numero: zod_1.z
                .number({
                required_error: "El numero de telefono es requerido",
                invalid_type_error: "El numero de telefono debe ser un number",
            })
                .min(1, {
                message: "El numero de telefono debe tener al menos un caracter",
            }),
        });
        return UsuarioAgregarTelefonoSchema;
    }
}
exports.UsuarioSchemas = UsuarioSchemas;
