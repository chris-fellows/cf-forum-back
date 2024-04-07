CREATE TABLE `posts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `GroupID` int NOT NULL,
  `Text` varchar(500) NOT NULL,
  `UserID` int NOT NULL,
  `CreatedDateTime` datetime NOT NULL,
  `Sequence` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
