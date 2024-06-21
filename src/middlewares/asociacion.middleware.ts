import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import * as fs from "node:fs/promises";
import { AsociacionModel } from "../models/asociacion.model";

export class AsociacionMiddleware {
  static schemaValidation =
    (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = Object.assign({}, req.body);
        schema.parse(body);
        next();
      } catch (error: any) {
        if (error instanceof ZodError) {
          if (req.file) {
            await fs.unlink(`./public/uploads/${req.file.filename}`);
          }
          return res
            .status(400)
            .json({ message: error.errors.map((e: any) => e.message) });
        }
      }
    };

  static async validarOneAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { admin_id } = req.body;

      if (!admin_id) {
        throw new Error("No hay admin_id");
      }

      const foundAsociacion = await AsociacionModel.buscarAsocIdAdmin(admin_id);

      if (!foundAsociacion) {
        // asignando rol de admin de asociacion
        await AsociacionModel.asignarRol(admin_id);

        next();
      } else {
        throw new Error("Este usuario ya tiene una asociacion");
      }
    } catch (error: any) {
      if (req.file) {
        await fs.unlink(`./public/uploads/${req.file.filename}`);
      }
      return res.status(400).json({ message: [error.message] });
    }
  }
}
