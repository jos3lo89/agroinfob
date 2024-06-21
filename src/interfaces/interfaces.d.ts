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

// agregar telefono de usuario
export interface agregarTelefonoUsuarioI {
  usuarioId: string;
  tipo: 'movil' | 'fijo';
  numero: number;
}

// asociacion register
interface AsociacionRegisterI {
  admin_id: string;
  nombre: string;
  descripcion: string;
  numero: string;
  tipo: "movil" | "fijo";
  portada: string;
  portada_id: string | null;
}