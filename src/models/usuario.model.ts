import prisma from "../config/database";
import {
  UsuarioRegisterI,
  actualizarClaveUsuarioI,
  actualizarDatosUsuarioI,
  agregarFotoUsuarioI,
} from "../interfaces/interfaces";

export class Usuario {
  static async create(data: UsuarioRegisterI) {
    try {
      const userfound = await Usuario.buscarUsuario(data.correo);

      if (userfound) {
        throw new Error("El correo ya existe");
      }

      const newUsuario = await prisma.usuarios.create({
        data,
      });

      return newUsuario;
    } catch (error: any) {
      throw error;
    }
  }

  static async buscarUsuario(correo: string) {
    try {
      const userfound = await prisma.usuarios.findFirst({
        where: {
          correo: correo,
        },
      });

      return userfound;
    } catch (error: any) {
      throw error;
    }
  }

  static async actualizarDatosUsuario(data: actualizarDatosUsuarioI) {
    try {
      const userUpdated = await prisma.usuarios.update({
        where: {
          correo: data.correo,
        },
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
        },
      });

      return userUpdated;
    } catch (error: any) {
      throw error;
    }
  }

  static async actualizarClaveUsuario(data: actualizarClaveUsuarioI) {
    try {
      const userUpdated = await prisma.usuarios.update({
        where: {
          correo: data.correo,
        },
        data: {
          clave: data.nuevaClave,
        },
      });

      return userUpdated;
    } catch (error: any) {
      throw error;
    }
  }

  static async agregarFotoUsuario(data: agregarFotoUsuarioI) {
    try {
      const userUpdated = await prisma.usuarios.update({
        where: {
          correo: data.correo,
        },
        data: {
          foto: data.foto,
        },
      });

      return userUpdated;
    } catch (error: any) {
      throw error;
    }
  }

  static async eliminarFotoUsuario(correo: string) {
    try {
      const userUpdated = await prisma.usuarios.update({
        where: {
          correo: correo,
        },
        data: {
          foto: null,
        },
      });

      return userUpdated;
    } catch (error: any) {
      throw error;
    }
  }

  static async actualizarFotoUsuario(data: agregarFotoUsuarioI) {
    try {
      const userUpdated = await prisma.usuarios.update({
        where: {
          correo: data.correo,
        },
        data: {
          foto: data.foto,
        },
      });

      return userUpdated;
    } catch (error: any) {
      throw error;
    }
  }

  static async eliminarUsuario(correo: string) {
    try {
      const userUpdated = await prisma.usuarios.delete({
        where: {
          correo: correo,
        },
      });

      return userUpdated;
    } catch (error: any) {
      throw error;
    }
  }
}
