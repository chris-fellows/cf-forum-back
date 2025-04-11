DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Content`(IN ID INT)
BEGIN
	SELECT c.*
    FROM contents c    
    WHERE c.ID = ID;    
END$$
DELIMITER ;
