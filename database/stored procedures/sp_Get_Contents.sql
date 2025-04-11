DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Contents`()
BEGIN
	SELECT c.*	
    FROM contents c
    ORDER BY c.Name;
END$$
DELIMITER ;
