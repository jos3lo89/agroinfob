import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";
import { Jwt } from "../utils/jwt";
import { Decoded } from "../interfaces/interfaces";

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

  static async validateUser() {}
}
