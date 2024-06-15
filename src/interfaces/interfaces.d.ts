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


// usuario actualizar datos
interface actualizarDatosUsuarioI {
  correo: string;
  nombre: string;
  apellido: string;
}


// usuario actualizar clave
interface actualizarClaveUsuarioI {
  correo: string;
  nuevaClave: string;
}

// agregar foto de usuario
interface agregarFotoUsuarioI {
  correo: string;
  foto: string;
}