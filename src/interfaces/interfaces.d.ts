export interface Payload {
  id: string;
  correo: string;
  rol: string;
}

export interface Decoded extends Payload {
  iat: number;
  exp: number;
}

declare module "express" {
  interface Request {
    user?: Decoded;
  }
}

// usuario register

export interface UsuarioRegisterI {
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
}
