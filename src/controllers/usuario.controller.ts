import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import * as fs from "node:fs/promises";

// mis imports
import { Usuario } from "../models/usuario.model";
import { Jwt } from "../utils/jwt";
import { config } from "../config/config";

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
        throw new Error("El usuario no existe");
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

      res.status(200).json({
        id: userfound.id,
        nombre: userfound.nombre,
        apellido: userfound.apellido,
        correo: userfound.correo,
        foto: userfound.foto
          ? `${config.serverUrl}${userfound.foto}`
          : userfound.foto,
        rol: userfound.rol,
        fechaCreacion: userfound.fechaCreacion,
        fechaActualizacion: userfound.fechaActualizacion,
      });
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
        throw new Error("El usuario no existe");
      }

      res.status(200).json({
        id: userfound.id,
        nombre: userfound.nombre,
        apellido: userfound.apellido,
        correo: userfound.correo,
        foto: userfound.foto
          ? `${config.serverUrl}${userfound.foto}`
          : userfound.foto,
        foto_id: userfound.foto_id
          ? `${config.serverUrl}${userfound.foto_id}`
          : userfound.foto_id,
        rol: userfound.rol,
        telefonos: userfound.telefonos,
        fechaCreacion: userfound.fechaCreacion,
        fechaActualizacion: userfound.fechaActualizacion,
      });
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

  static async actualizarDatos(req: Request, res: Response) {
    try {
      const correo = req.user?.correo;
      const { nombre, apellido } = req.body;

      if (!correo) {
        throw new Error("No hay usuario autenticado");
      }

      const userfound = await Usuario.buscarUsuario(correo);

      if (!userfound) {
        throw new Error("El usuario no existe");
      }

      const userUpdated = await Usuario.actualizarDatosUsuario({
        correo: correo,
        nombre: nombre,
        apellido: apellido,
      });

      res.status(200).json({
        nombre: userUpdated.nombre,
        apellido: userUpdated.apellido,
      });
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async actualizarClave(req: Request, res: Response) {
    try {
      const correo = req.user?.correo;
      const { clave, nuevaClave } = req.body;

      if (!correo) {
        throw new Error("No hay usuario autenticado");
      }

      const userfound = await Usuario.buscarUsuario(correo);

      if (!userfound) {
        throw new Error("El usuario no existe");
      }

      const isMatch = await bcrypt.compare(clave, userfound.clave);

      if (!isMatch) {
        throw new Error("La clave no es válida");
      }

      const nuevaClaveHash = await bcrypt.hash(nuevaClave, 10);

      const userUpdated = await Usuario.actualizarClaveUsuario({
        correo: correo,
        nuevaClave: nuevaClaveHash,
      });

      res.sendStatus(204);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async agregarFoto(req: Request, res: Response) {
    try {
      const correo = req.user?.correo;

      if (!correo) {
        throw new Error("No hay usuario autenticado");
      }

      if (!req.file) {
        throw new Error("No se ha enviado el archivo");
      }

      const userfound = await Usuario.buscarUsuario(correo);

      if (!userfound) {
        throw new Error("El usuario no existe");
      }

      if (userfound.foto) {
        await fs.unlink(`./public/uploads/${req.file.filename}`);
        throw new Error("El usuario ya tiene una foto");
      }

      const userUpdated = await Usuario.agregarFotoUsuario({
        correo: correo,
        foto: `/uploads/${req.file.filename}`,
      });

      res.status(200).json({
        foto: `${config.serverUrl}${userUpdated.foto}`,
      });
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async eliminarFoto(req: Request, res: Response) {
    try {
      const correo = req.user?.correo;

      if (!correo) {
        throw new Error("No hay usuario autenticado");
      }

      const userfound = await Usuario.buscarUsuario(correo);

      if (!userfound) {
        throw new Error("El usuario no existe");
      }

      if (!userfound.foto) {
        throw new Error("El usuario no tiene una foto");
      }

      await fs.unlink(`./public${userfound.foto}`);

      await Usuario.eliminarFotoUsuario(correo);

      res.sendStatus(204);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async actualizarFoto(req: Request, res: Response) {
    try {
      const correo = req.user?.correo;

      if (!req.file) {
        throw new Error("No se ha enviado el archivo");
      }

      if (!correo) {
        throw new Error("No hay usuario autenticado");
      }

      const userfound = await Usuario.buscarUsuario(correo);

      if (!userfound) {
        throw new Error("El usuario no existe");
      }

      if (!userfound.foto) {
        await fs.unlink(`./public/uploads/${req.file.filename}`);
        throw new Error("El usuario no tiene una foto");
      }

      await fs.unlink(`./public${userfound.foto}`);

      const userUpdated = await Usuario.actualizarFotoUsuario({
        correo: correo,
        foto: `/uploads/${req.file.filename}`,
      });

      res.status(200).json({
        foto: `${config.serverUrl}${userUpdated.foto}`,
      });
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async eliminar(req: Request, res: Response) {
    try {
      const correo = req.user?.correo;

      const { clave } = req.body;

      if (!clave) {
        throw new Error("Clave no enviada");
      }

      if (!correo) {
        throw new Error("No hay usuario autenticado");
      }

      const userfound = await Usuario.buscarUsuario(correo);

      if (!userfound) {
        throw new Error("El usuario no existe");
      }

      const isMatch = await bcrypt.compare(clave, userfound.clave);

      if (!isMatch) {
        throw new Error("La clave no coincide");
      }

      if (userfound.foto) {
        await fs.unlink(`./public${userfound.foto}`);
      }

      const userDeleted = await Usuario.eliminarUsuario(correo);

      res.sendStatus(204);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async agregarTelefono(req: Request, res: Response) {
    try {
      const correo = req.user?.correo;

      const usuarioId = req.user?.id;
      const { tipo, numero } = req.body;

      if (!usuarioId) {
        throw new Error("No hay usuario autenticado");
      }

      if (!correo) {
        throw new Error("No hay usuario autenticado");
      }

      const userfound = await Usuario.buscarUsuario(correo);

      if (!userfound) {
        throw new Error("El usuario no existe");
      }

      if (userfound.telefonos.length >= 2) {
        throw new Error("El usuario ya tiene dos telefonos");
      }

      if (!numero) {
        throw new Error("No hay tipo o numero de telefono");
      }

      if (tipo !== "movil" && tipo !== "fijo") {
        throw new Error("Tipo de telefono no valido");
      }

      const telefono = await Usuario.agregarTelefonoUsuario({
        usuarioId,
        tipo,
        numero,
      });

      res.status(201).json(telefono);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }
}
