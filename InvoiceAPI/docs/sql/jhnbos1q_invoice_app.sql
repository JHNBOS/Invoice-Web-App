-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Gegenereerd op: 25 feb 2018 om 20:17
-- Serverversie: 10.1.24-MariaDB
-- PHP-versie: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jhnbos1q_invoice_app`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `address`
--

CREATE TABLE `address` (
  `street` varchar(150) NOT NULL,
  `number` int(11) NOT NULL,
  `suffix` varchar(10) NOT NULL,
  `postal_code` varchar(40) NOT NULL,
  `city` varchar(150) NOT NULL,
  `country` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `company`
--

CREATE TABLE `company` (
  `business_number` int(11) NOT NULL,
  `company_name` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `bank_account` varchar(50) NOT NULL,
  `phone` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `debtor`
--

CREATE TABLE `debtor` (
  `ssn` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `bank_account` varchar(50) NOT NULL,
  `phone` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `has_invoice`
--

CREATE TABLE `has_invoice` (
  `invoice_number` int(11) NOT NULL,
  `debtor_ssn` int(11) DEFAULT NULL,
  `company_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `invoice`
--

CREATE TABLE `invoice` (
  `invoice_number` int(11) NOT NULL,
  `created_on` date NOT NULL,
  `expired_on` date NOT NULL,
  `tax` int(11) NOT NULL,
  `total` double NOT NULL,
  `comment` varchar(250) DEFAULT NULL,
  `discount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `lives_at`
--

CREATE TABLE `lives_at` (
  `debtor_ssn` int(11) NOT NULL,
  `address_number` int(11) NOT NULL,
  `address_postal` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `located_at`
--

CREATE TABLE `located_at` (
  `company_number` int(11) NOT NULL,
  `address_number` int(11) NOT NULL,
  `address_postal` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`number`,`postal_code`);

--
-- Indexen voor tabel `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`business_number`);

--
-- Indexen voor tabel `debtor`
--
ALTER TABLE `debtor`
  ADD PRIMARY KEY (`ssn`);

--
-- Indexen voor tabel `has_invoice`
--
ALTER TABLE `has_invoice`
  ADD PRIMARY KEY (`invoice_number`);

--
-- Indexen voor tabel `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_number`);

--
-- Indexen voor tabel `lives_at`
--
ALTER TABLE `lives_at`
  ADD PRIMARY KEY (`debtor_ssn`,`address_number`,`address_postal`);

--
-- Indexen voor tabel `located_at`
--
ALTER TABLE `located_at`
  ADD PRIMARY KEY (`company_number`,`address_number`,`address_postal`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `company`
--
ALTER TABLE `company`
  MODIFY `business_number` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `debtor`
--
ALTER TABLE `debtor`
  MODIFY `ssn` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_number` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
