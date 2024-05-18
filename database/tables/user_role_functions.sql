CREATE TABLE `user_role_functions` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `UserRoleID` int NOT NULL,
  `UserRoleFunctionTypeID` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
