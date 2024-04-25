CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Login_User`(IN EmailIn NVARCHAR(100), IN PasswordIn NVARCHAR(100))
BEGIN
	/*DECLARE UserID INT DEFAULT NULL;*/
    DECLARE Token NVARCHAR(100) DEFAULT UUID();

    SELECT u.ID
    INTO @UserID
    FROM users u
    WHERE u.Email = EmailIn AND
		u.Password = PasswordIn LIMIT 1;	
        
	IF @UserID IS NOT NULL THEN
		DELETE FROM user_sessions WHERE UserID = @UserID;    
		INSERT INTO user_sessions(CreatedDateTime, UserID, Token)  VALUES (NOW(), @UserID, Token);
    END IF;
    
    /*
    SELECT *
    FROM users u
    WHERE u.Email = EmailIn AND
		u.Password = PasswordIn;	
	*/
				
    SELECT Token, u.*
    FROM users u
    WHERE U.ID = @UserID;     
END