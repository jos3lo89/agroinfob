import { Router } from "express";

// mis imports
import { AsociacionController } from "../controllers/asociacion.controller";
import { AsociacionMiddleware } from "../middlewares/asociacion.middleware";
import { AsociacionSchemas } from "../schemas/asociacion.schema";

const router = Router();

// POST registrar
router.post("/asociacion/registrar");

export default router;
