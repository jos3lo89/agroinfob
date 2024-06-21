import prisma from "../config/database";
import { AsociacionRegisterI } from "../interfaces/interfaces";

export class AsociacionModel {
  static async crearAsociacion(data: AsociacionRegisterI) {
    try {
      const asociacion = await prisma.asociaciones.create({
        data: {
          admin_id: data.admin_id,
          nombre: data.nombre,
          descripcion: data.descripcion,
          portada: data.portada,
          portada_id: null,
        },
      });

      await prisma.telefonosAsociacion.create({
        data: {
          asociacion_id: asociacion.id,
          numero: data.numero,
          tipo: data.tipo,
        },
      });

      return asociacion;
    } catch (error: any) {
      throw error;
    }
  }

  static async buscarAsocIdAdmin(idAdmin: string) {
    try {
      const asociacion = await prisma.asociaciones.findFirst({
        where: {
          admin_id: idAdmin,
        },
      });

      return asociacion;
    } catch (error: any) {
      throw error;
    }
  }

  static async datosAsociacion(nombre: string) {
    try {
      const asociacion = await prisma.asociaciones.findFirst({
        where: {
          nombre: nombre,
        },
        include: {
          telefonos: true,
        },
      });

      return asociacion;
    } catch (error: any) {
      throw error;
    }
  }

  static async asignarRol(id: string) {
    try {
      const userUpdate = await prisma.usuarios.update({
        where: {
          id,
        },
        data: {
          rol: "adminAsociacion",
        },
      });

      return userUpdate;
    } catch (error: any) {
      throw error;
    }
  }

  static async getDatosAsocAdmin(id: string) {
    try {
      const userFound = await prisma.usuarios.findFirst({
        where: {
          id,
        },
      });

      if (!userFound) {
        throw new Error("Usuario no encontrado");
      }

      const asocFound = await prisma.asociaciones.findFirst({
        where: {
          admin_id: userFound.id,
        },
      });

      if (!asocFound) {
        throw new Error("Asocición no encontrada");
      }

      return asocFound;
    } catch (error: any) {
      throw error;
    }
  }

  static async listarAsoc() {
    try { 

      const listaAsoc = await prisma.asociaciones.findMany()

      if (!listaAsoc) {
        throw new Error("No se pudo listar asociaciones")
      }
      return listaAsoc

    } catch (error) {
      throw error
    }
  }
}
