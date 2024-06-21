-- CreateTable
CREATE TABLE `Publicaciones` (
    `id` CHAR(36) NOT NULL,
    `asociacion_id` CHAR(36) NOT NULL,
    `titulo` VARCHAR(100) NOT NULL,
    `contenido1` TEXT NOT NULL,
    `contenido2` TEXT NULL,
    `foto1` VARCHAR(80) NULL,
    `foto1_id` VARCHAR(100) NULL,
    `foto2` VARCHAR(80) NULL,
    `foto2_id` VARCHAR(100) NULL,
    `fechaPublicacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaActualizacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Publicaciones` ADD CONSTRAINT `Publicaciones_asociacion_id_fkey` FOREIGN KEY (`asociacion_id`) REFERENCES `Asociaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
