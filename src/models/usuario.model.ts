import prisma from "../config/database";
import { UsuarioRegisterI } from "../interfaces/interfaces";

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
}
