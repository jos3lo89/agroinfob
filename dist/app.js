"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// mis imports
const config_1 = require("./config/config");
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const asociacion_routes_1 = __importDefault(require("./routes/asociacion.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.config.clientUrl,
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
// rutas de usuarios
app.use("/api", usuario_routes_1.default);
// rutas de asociacion
app.use("/api", asociacion_routes_1.default);
exports.default = app;
