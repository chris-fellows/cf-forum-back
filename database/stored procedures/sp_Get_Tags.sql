DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Tags`()
BEGIN
	SELECT t.*	
    FROM tags t
    ORDER BY t.Name;
END$$
DELIMITER ;
