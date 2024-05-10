CREATE TABLE `audit` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CreatedDateTime` datetime NOT NULL,
  `UserID` int DEFAULT NULL,
  `EventTypeID` int NOT NULL,
  `Data` json DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=513 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
