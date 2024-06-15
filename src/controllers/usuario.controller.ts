import { Request, Response } from "express";
import bcrypt from "bcryptjs";

// mis imports
import { Usuario } from "../models/usuario.model";
import { Jwt } from "../utils/jwt";

export class UsuarioController {
  static async registrar(req: Request, res: Response) {
    try {
      const { nombre, apellido, correo, clave } = req.body;

      const hashedClave = await bcrypt.hash(clave, 10);

      const newUsuario = await Usuario.create({
        nombre,
        apellido,
        correo,
        clave: hashedClave,
      });

      res.status(201).json(newUsuario);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { correo, clave } = req.body;

      const userfound = await Usuario.buscarUsuario(correo);

      if (!userfound) {
        throw new Error("El correo no existe");
      }

      const isMatch = await bcrypt.compare(clave, userfound.clave);

      if (!isMatch) {
        throw new Error("La clave no es válida");
      }

      const token = await Jwt.create({
        id: userfound.id,
        correo: userfound.correo,
        rol: userfound.rol,
      });

      res.cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json(userfound);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async getUsuarioDatos(req: Request, res: Response) {
    try {
      const correo = req.user?.correo;

      if (!correo) {
        throw new Error("No hay usuario autenticado");
      }

      const userfound = await Usuario.buscarUsuario(correo);

      if (!userfound) {
        throw new Error("El correo no existe");
      }

      res.status(200).json(userfound);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async logOut(_req: Request, res: Response) {
    try {
      res.clearCookie("token");
      res.sendStatus(204);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }
}
