-- CreateTable
CREATE TABLE `Usuarios` (
    `id` CHAR(36) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `foto` VARCHAR(33) NULL,
    `foto_id` VARCHAR(100) NULL,
    `correo` VARCHAR(25) NOT NULL,
    `clave` VARCHAR(60) NOT NULL,
    `rol` ENUM('publico', 'administrador', 'adminAsociacion') NOT NULL DEFAULT 'publico',
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaActualizacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuarios_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TelefonoUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` CHAR(36) NOT NULL,
    `tipo` ENUM('movil', 'fijo') NOT NULL,
    `numero` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TelefonoUsuario` ADD CONSTRAINT `TelefonoUsuario_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
