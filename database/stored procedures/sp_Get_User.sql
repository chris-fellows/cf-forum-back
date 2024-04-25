CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_User`(IN ID INT)
BEGIN
	SELECT u.*
    FROM users u    
    WHERE u.ID = ID;    
END