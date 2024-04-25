CREATE TABLE `user_sessions` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CreatedDateTime` datetime NOT NULL,
  `UserID` int NOT NULL,
  `Token` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
