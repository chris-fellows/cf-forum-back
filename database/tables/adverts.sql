CREATE TABLE `adverts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `FromDateTime` datetime NOT NULL,
  `ToDateTime` datetime NOT NULL,
  `Logo` varchar(100) NOT NULL,
  `LogoType` int NOT NULL,
  `External` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
