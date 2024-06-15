"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    static getProfile(id) {
        return {
            id,
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            age: 30,
        };
    }
    static create(data) {
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            age: data.age,
        };
    }
    static update(data) {
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            age: data.age,
        };
    }
    static delete(id) {
        return {
            id,
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            age: 30,
        };
    }
}
exports.Usuario = Usuario;
