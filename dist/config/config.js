"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    serverUrl: process.env.SERVER_URL,
    clientUrl: process.env.CLIENT_URL
};
