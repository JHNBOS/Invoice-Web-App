-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema invoice_app
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema invoice_app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `invoice_app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `invoice_app` ;

-- -----------------------------------------------------
-- Table `invoice_app`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoice_app`.`addresses` (
  `street` VARCHAR(150) NOT NULL,
  `number` INT(11) NOT NULL,
  `suffix` VARCHAR(10) NULL DEFAULT NULL,
  `postal_code` VARCHAR(40) NOT NULL,
  `city` VARCHAR(150) NOT NULL,
  `country` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`number`, `postal_code`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `invoice_app`.`debtors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoice_app`.`debtors` (
  `id` VARCHAR(200) NOT NULL,
  `first_name` VARCHAR(100) NULL DEFAULT NULL,
  `last_name` VARCHAR(100) NULL DEFAULT NULL,
  `company_name` VARCHAR(250) NULL DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL,
  `bank_account` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `invoice_app`.`debtor_has_addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoice_app`.`debtor_has_addresses` (
  `debtor_id` VARCHAR(200) CHARACTER SET 'latin1' NOT NULL,
  `postal_code` VARCHAR(40) CHARACTER SET 'latin1' NOT NULL,
  `number` INT(11) NOT NULL,
  PRIMARY KEY (`debtor_id`, `postal_code`, `number`),
  INDEX `dha_address_fk` (`number` ASC, `postal_code` ASC) VISIBLE,
  CONSTRAINT `dha_address_fk`
    FOREIGN KEY (`number` , `postal_code`)
    REFERENCES `invoice_app`.`addresses` (`number` , `postal_code`)
    ON DELETE CASCADE,
  CONSTRAINT `dha_debtor_fk`
    FOREIGN KEY (`debtor_id`)
    REFERENCES `invoice_app`.`debtors` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `invoice_app`.`invoices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoice_app`.`invoices` (
  `invoice_number` VARCHAR(200) NOT NULL,
  `customer_id` VARCHAR(200) NOT NULL,
  `created_on` DATETIME NOT NULL,
  `expired_on` DATETIME NOT NULL,
  `total` DECIMAL(18,2) NOT NULL,
  `comment` VARCHAR(250) NULL DEFAULT NULL,
  `discount` INT(11) NOT NULL,
  `is_paid` TINYINT(1) NOT NULL DEFAULT '0',
  `concept` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`invoice_number`),
  INDEX `invoices_debtors_fk` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `invoices_debtors_fk`
    FOREIGN KEY (`customer_id`)
    REFERENCES `invoice_app`.`debtors` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `invoice_app`.`invoice_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoice_app`.`invoice_items` (
  `invoice_number` VARCHAR(200) CHARACTER SET 'latin1' NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `description` VARCHAR(250) NULL DEFAULT NULL,
  `price` DECIMAL(18,2) NOT NULL,
  `quantity` INT(11) NOT NULL,
  `item_number` INT(11) NOT NULL AUTO_INCREMENT,
  `tax` INT(11) NOT NULL,
  PRIMARY KEY (`item_number`, `invoice_number`),
  INDEX `items_invoice_fk` (`invoice_number` ASC) VISIBLE,
  CONSTRAINT `items_invoice_fk`
    FOREIGN KEY (`invoice_number`)
    REFERENCES `invoice_app`.`invoices` (`invoice_number`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `invoice_app`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoice_app`.`roles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `invoice_app`.`settings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoice_app`.`settings` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(300) CHARACTER SET 'latin1' NOT NULL,
  `website` VARCHAR(300) CHARACTER SET 'latin1' NULL DEFAULT NULL,
  `phone` VARCHAR(40) CHARACTER SET 'latin1' NULL DEFAULT NULL,
  `email` VARCHAR(150) CHARACTER SET 'latin1' NOT NULL,
  `password` VARCHAR(80) CHARACTER SET 'latin1' NOT NULL,
  `smtp` VARCHAR(80) CHARACTER SET 'latin1' NOT NULL,
  `port` INT(11) NOT NULL,
  `bank_account` VARCHAR(150) CHARACTER SET 'latin1' NOT NULL,
  `bank` VARCHAR(150) CHARACTER SET 'latin1' NOT NULL,
  `address` VARCHAR(200) CHARACTER SET 'latin1' NOT NULL,
  `postal_code` VARCHAR(20) CHARACTER SET 'latin1' NOT NULL,
  `city` VARCHAR(250) CHARACTER SET 'latin1' NOT NULL,
  `country` VARCHAR(250) CHARACTER SET 'latin1' NOT NULL,
  `business_number` VARCHAR(200) CHARACTER SET 'latin1' NOT NULL,
  `vat_number` VARCHAR(200) CHARACTER SET 'latin1' NOT NULL,
  `invoice_prefix` VARCHAR(20) CHARACTER SET 'latin1' NULL DEFAULT NULL,
  `logo` TEXT CHARACTER SET 'latin1' NULL DEFAULT NULL,
  `show_logo` BIT(1) NOT NULL DEFAULT b'0',
  `show_logo_in_pdf` BIT(1) NOT NULL DEFAULT b'0',
  `color` VARCHAR(45) NOT NULL DEFAULT '#1e90ff',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `invoice_app`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoice_app`.`users` (
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(150) NOT NULL,
  `last_name` VARCHAR(175) NOT NULL,
  `picture` TEXT NULL DEFAULT NULL,
  `role` INT(11) NOT NULL,
  `company_name` VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
