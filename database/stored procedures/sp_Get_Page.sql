DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Page`(IN ID INT)
BEGIN
	SELECT p.*
    FROM pages p    
    WHERE p.ID = ID;    
END$$
DELIMITER ;
