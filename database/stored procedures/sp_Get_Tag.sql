DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Tag`(IN ID INT)
BEGIN
	SELECT t.*
    FROM tags t    
    WHERE t.ID = ID;    
END$$
DELIMITER ;
