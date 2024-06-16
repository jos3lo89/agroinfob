import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";
import { Jwt } from "../utils/jwt";
import { Decoded } from "../interfaces/interfaces";
import * as fs from "node:fs/promises";

export class Validator {
  static async validateAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.token;

      if (!token) {
        throw new Error("No hay token");
      }

      if (!config.jwtSecret) {
        throw new Error("No se ha configurado el secreto de JWT");
      }

      const decoded = (await Jwt.verify(token)) as Decoded;

      req.user = decoded;
      next();
    } catch (error: any) {
      return res.status(401).json({ message: [error.message] });
    }
  }

  static async adminValidator(req: Request, res: Response, next: NextFunction) {
    try {
      const rol = req.user?.rol;

      if (!rol) {
        throw new Error("No hay rol autenticado");
      }

      if (rol !== "administrador") {
        throw new Error("No tines acceso");
      }

      next();
    } catch (error: any) {
      return res.status(401).json({ message: [error.message] });
    }
  }

  static async adminAsocValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const rol = req.user?.rol;

      if (!rol) {
        throw new Error("No hay rol autenticado");
      }

      if (rol !== "adminAsociacion") {
        throw new Error("No tines acceso");
      }

      next();
    } catch (error: any) {
      return res.status(401).json({ message: [error.message] });
    }
  }
}

export class FilesValidator {
  static async validateFile(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;

      if (!file) {
        throw new Error("No se ha enviado el archivo");
      }

      if (!file.mimetype.match(/jpeg|jpg|png|webp/)) {
        await fs.unlink(`./public/uploads/${file.filename}`);
        throw new Error(
          "Sólo se permiten imágenes de tipo jpeg, jpg, png y webp."
        );
      }

      next();
    } catch (error: any) {
      return res.status(400).json({ message: [error.message] });
    }
  }
}
