CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Logout_User`(IN TokenIn NVARCHAR(100))
BEGIN
    SELECT us.UserID
    INTO @UserSessionID
    FROM user_sessions us
    WHERE us.Token = TokenIn;
        
	IF @UserSessionID IS NOT NULL THEN
		DELETE FROM user_sessions WHERE ID = @UserSessionID;
    END IF;
    
    SELECT @UserSessionID AS UserSessionID;    
END