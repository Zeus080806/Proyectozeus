-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-07-2024 a las 17:50:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestionh`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcionarios`
--

CREATE TABLE `funcionarios` (
  `IDusuarios` int(11) NOT NULL,
  `cedula` decimal(10,0) NOT NULL,
  `nombres` varchar(20) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `EPS` varchar(30) NOT NULL,
  `FP` varchar(30) NOT NULL,
  `hijos` decimal(10,0) NOT NULL,
  `estadocivil` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `funcionarios`
--

INSERT INTO `funcionarios` (`IDusuarios`, `cedula`, `nombres`, `apellidos`, `correo`, `EPS`, `FP`, `hijos`, `estadocivil`) VALUES
(10, 1131111817, 'jhon faber', 'Herrera Garcia', 'faber@gmail.com', 'sanitas', 'proteccion', 1, 'casado'),
(11, 1014250815, 'diego alejandro', 'acevedo martinez', 'alejandro@gmail.com', 'famisanar', 'proteccion', 1, 'union libre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `cedula` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  `ccontrasena` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`cedula`, `nombre`, `correo`, `contrasena`, `ccontrasena`) VALUES
(58555223, 'jennyfer', 'jader@gmail.com', '$2a$10$a73QIroLAjEZE5A3WPD9sua7L57T45WOofR3cFPQDuv', ''),
(80256222, 'faber', 'jader@gmail.com', '$2a$10$HYr5aoTzYc3lSaH/WM/Vc.uBenjEk0stoe6qzvECPPO', ''),
(80256225, 'jacobo', 'jacobo@gmail.com', '$2a$10$nQKCauTMuQjDhWCxDrR34uorSHQnORCMImNtQTMbu9p', ''),
(1131111819, 'faber garcia', 'jhon@gmail.com', '$2a$10$ehSGgJm8090RG9x8qLDmsehZPG4ekeQJg4Gt6d7yHOX', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`IDusuarios`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`cedula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `IDusuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `cedula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
