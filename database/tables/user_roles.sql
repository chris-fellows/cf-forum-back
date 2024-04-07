CREATE TABLE `user_roles` (
  `ID` int NOT NULL,
  `UserID` int NOT NULL,
  `UserRoleTypeID` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
