import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { Payload } from "../interfaces/interfaces";

export class Jwt {
  static async create(payload: Payload) {
    return new Promise((resolve, reject) => {
      if (config.jwtSecret) {
        jwt.sign(
          payload,
          config.jwtSecret,
          { expiresIn: "1d" },
          (err, token) => {
            if (err) reject(err);
            resolve(token);
          }
        );
      } else {
        reject("No se ha configurado el secreto de JWT");
      }
    });
  }

  static async verify(token: string) {
    try {
      if (!config.jwtSecret) {
        throw new Error("No se ha configurado el secreto de JWT");
      }

      const decoded = jwt.verify(token, config.jwtSecret);

      return decoded;
    } catch (error: any) {
      throw error;
    }
  }
}
