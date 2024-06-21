import { Request, Response } from "express";
import { AsociacionModel } from "../models/asociacion.model";
import { config } from "../config/config";

export class AsociacionController {
  static async registrar(req: Request, res: Response) {
    const { admin_id, nombre, descripcion, numero, tipo } = req.body;

    if (!req.file) {
      throw new Error("No se ha enviado el archivo");
    }

    const asociacion = await AsociacionModel.crearAsociacion({
      admin_id,
      nombre,
      descripcion,
      numero,
      tipo,
      portada: `/uploads/${req.file.filename}`,
      portada_id: null,
    });

    res.status(201).json(asociacion);
    try {
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async getAsociacionDatos(req: Request, res: Response) {
    try {
      const { nombre } = req.params;

      const asociacion = await AsociacionModel.datosAsociacion(nombre);

      if (!asociacion) {
        throw new Error("no se econtro la asociacion");
      }

      res.status(200).json({
        id: asociacion.id,
        nombre: asociacion.nombre,
        descripcion: asociacion.descripcion,
        portada: `${config.serverUrl}${asociacion.portada}`,
        portada_id: asociacion.portada_id,
        telefonos: asociacion.telefonos,
      });

      // CUANDO HAYA  MAS DATOS
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async getDatosAscoAdmin(req: Request, res: Response) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new Error("Id de usuario no enviada");
      }

      const asocData = await AsociacionModel.buscarAsocIdAdmin(id);

      if (!asocData) {
        throw new Error("Asociación no encontrada");
      }

      res.status(200).json({
        id: asocData.id,
        admin_id: asocData.admin_id,
        nombre: asocData.nombre,
        descripcion: asocData.descripcion,
        portada: `${config.serverUrl}${asocData.portada}`,
        portada_id: asocData.portada_id,
        fechaCreacion: asocData.fechaCreacion,
        fechaActualizacion: asocData.fechaActualizacion,
      });
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ message: [error.message] });
    }
  }

  static async listarAsoc(req: Request, res: Response) {
    try {
      const listaAsoc = await AsociacionModel.listarAsoc();

      if (!listaAsoc) {
        throw new Error("No se pudo listar las asociaciones");
      }

      res.status(200).json(listaAsoc);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ message: [error.message] });
    }
  }
}
