DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Create_Token`()
BEGIN	
    DECLARE Token NVARCHAR(100);

    SELECT u.ID
    INTO @UserID
    FROM users u
    WHERE u.Email = 'chrismfellows@hotmail.co.uk' LIMIT 1;
    
    SELECT @UserID AS MyUserID;
    
    SET Token = CONCAT(CONVERT(@UserID ,NCHAR), '|', CONVERT(UUID(), NCHAR));
    
    SELECT Token AS NewToken;
END$$
DELIMITER ;
