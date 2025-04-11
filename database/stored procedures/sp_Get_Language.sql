DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Language`(IN ID INT)
BEGIN
	SELECT l.*
    FROM languages l    
    WHERE l.ID = ID;    
END$$
DELIMITER ;
