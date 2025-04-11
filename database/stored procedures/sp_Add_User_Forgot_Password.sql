DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Add_User_Forgot_Password`(IN EmailIn NVARCHAR(100))
BEGIN		
    SELECT u.*
    FROM cfforum.users U
    WHERE U.Email = EmailIn;
END$$
DELIMITER ;
