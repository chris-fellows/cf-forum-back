DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Login_User`(IN EmailIn NVARCHAR(100), IN PasswordIn NVARCHAR(100))
BEGIN	
    SELECT u.ID
    INTO @UserID
    FROM users u
    WHERE u.Email = EmailIn AND
		u.Password = PasswordIn LIMIT 1;	
        		
    CALL sp_Add_Audit('USER_LOG_IN', @UserID, NULL);
    		
    SELECT u.*,
		ur.Name as UserRoleName,
        ur.InternalName as UserRoleInternalName
    FROM users u
		INNER JOIN user_roles ur ON UR.ID = u.RoleID
    WHERE U.ID = @UserID;     
END$$
DELIMITER ;
