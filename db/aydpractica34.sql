CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `no_cuenta` int(11) NOT NULL,
  `password` varchar(45) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `correo` varchar(45) NOT NULL,
  `dpi` varchar(45) DEFAULT NULL,
  `saldo_inicial` decimal(20,2) DEFAULT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `username_UNIQUE` (`no_cuenta`),
  UNIQUE KEY `correo_UNIQUE` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

use aydpractica34;
INSERT INTO user (nombre,apellido,correo,no_cuenta,password, dpi,saldo_inicial) VALUES ("admin","admin", "admin@mail.com", 10,"123","1",1000);