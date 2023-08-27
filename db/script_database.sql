-- MySQL Script generated by MySQL Workbench
-- dom 27 ago 2023 10:51:46
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema GENERADOR_HORARIOS
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `GENERADOR_HORARIOS` ;

-- -----------------------------------------------------
-- Schema GENERADOR_HORARIOS
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `GENERADOR_HORARIOS` ;
USE `GENERADOR_HORARIOS` ;

-- -----------------------------------------------------
-- Table `GENERADOR_HORARIOS`.`Salon`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GENERADOR_HORARIOS`.`Salon` ;

CREATE TABLE IF NOT EXISTS `GENERADOR_HORARIOS`.`Salon` (
  `numero_salon` INT NOT NULL,
  `escritorios` INT NOT NULL,
  PRIMARY KEY (`numero_salon`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GENERADOR_HORARIOS`.`Carrera`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GENERADOR_HORARIOS`.`Carrera` ;

CREATE TABLE IF NOT EXISTS `GENERADOR_HORARIOS`.`Carrera` (
  `id_carrera` VARCHAR(8) NOT NULL,
  `division` VARCHAR(45) NOT NULL,
  `nombre_carrera` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_carrera`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GENERADOR_HORARIOS`.`Materia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GENERADOR_HORARIOS`.`Materia` ;

CREATE TABLE IF NOT EXISTS `GENERADOR_HORARIOS`.`Materia` (
  `codigo` VARCHAR(8) NOT NULL,
  `nombre` VARCHAR(75) NOT NULL,
  PRIMARY KEY (`codigo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GENERADOR_HORARIOS`.`Materia_Carrera`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GENERADOR_HORARIOS`.`Materia_Carrera` ;

CREATE TABLE IF NOT EXISTS `GENERADOR_HORARIOS`.`Materia_Carrera` (
  `carrera` VARCHAR(8) NOT NULL,
  `materia` VARCHAR(8) NOT NULL,
  INDEX `fk_Materia_Carrera_Carrera_idx` (`carrera` ASC) VISIBLE,
  INDEX `fk_Materia_Carrera_Materia1_idx` (`materia` ASC) VISIBLE,
  PRIMARY KEY (`carrera`, `materia`),
  CONSTRAINT `fk_Materia_Carrera_Carrera`
    FOREIGN KEY (`carrera`)
    REFERENCES `GENERADOR_HORARIOS`.`Carrera` (`id_carrera`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Materia_Carrera_Materia1`
    FOREIGN KEY (`materia`)
    REFERENCES `GENERADOR_HORARIOS`.`Materia` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GENERADOR_HORARIOS`.`Profesor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GENERADOR_HORARIOS`.`Profesor` ;

CREATE TABLE IF NOT EXISTS `GENERADOR_HORARIOS`.`Profesor` (
  `id_profesor` INT NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `hora_entrada` TIME NOT NULL,
  `hora_salida` TIME NOT NULL,
  PRIMARY KEY (`id_profesor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GENERADOR_HORARIOS`.`Profesor_Materia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GENERADOR_HORARIOS`.`Profesor_Materia` ;

CREATE TABLE IF NOT EXISTS `GENERADOR_HORARIOS`.`Profesor_Materia` (
  `profesor` INT NOT NULL,
  `materia` VARCHAR(8) NOT NULL,
  `titular` TINYINT(1) NOT NULL,
  INDEX `fk_Profesor_Materia_Profesor1_idx` (`profesor` ASC) VISIBLE,
  INDEX `fk_Profesor_Materia_Materia1_idx` (`materia` ASC) VISIBLE,
  PRIMARY KEY (`profesor`, `materia`),
  CONSTRAINT `fk_Profesor_Materia_Profesor1`
    FOREIGN KEY (`profesor`)
    REFERENCES `GENERADOR_HORARIOS`.`Profesor` (`id_profesor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Profesor_Materia_Materia1`
    FOREIGN KEY (`materia`)
    REFERENCES `GENERADOR_HORARIOS`.`Materia` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GENERADOR_HORARIOS`.`Seccion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GENERADOR_HORARIOS`.`Seccion` ;

CREATE TABLE IF NOT EXISTS `GENERADOR_HORARIOS`.`Seccion` (
  `Semestre` INT NOT NULL,
  `Anio` YEAR NOT NULL,
  `letra` VARCHAR(2) NOT NULL,
  `cantidad_estudiantes` INT NOT NULL,
  `materia` VARCHAR(8) NOT NULL,
  `profesor` INT NOT NULL,
  INDEX `fk_Seccion_Materia1_idx` (`materia` ASC) VISIBLE,
  PRIMARY KEY (`Semestre`, `Anio`, `letra`, `materia`),
  INDEX `fk_Seccion_Profesor1_idx` (`profesor` ASC) VISIBLE,
  CONSTRAINT `fk_Seccion_Materia1`
    FOREIGN KEY (`materia`)
    REFERENCES `GENERADOR_HORARIOS`.`Materia` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Seccion_Profesor1`
    FOREIGN KEY (`profesor`)
    REFERENCES `GENERADOR_HORARIOS`.`Profesor` (`id_profesor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
