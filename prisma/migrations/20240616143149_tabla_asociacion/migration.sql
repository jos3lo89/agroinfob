-- CreateTable
CREATE TABLE `Asociaciones` (
    `id` CHAR(36) NOT NULL,
    `admin_id` CHAR(36) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `portada` VARCHAR(80) NOT NULL,
    `portada_id` VARCHAR(100) NOT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaActualizacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TelefonosAsociacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asociacion_id` CHAR(36) NOT NULL,
    `numero` VARCHAR(20) NOT NULL,
    `tipo` ENUM('movil', 'fijo') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TelefonosAsociacion` ADD CONSTRAINT `TelefonosAsociacion_asociacion_id_fkey` FOREIGN KEY (`asociacion_id`) REFERENCES `Asociaciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
