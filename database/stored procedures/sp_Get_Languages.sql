DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Languages`()
BEGIN
	SELECT l.* 
    FROM cfforum.languages l    
    ORDER BY l.Name;
END$$
DELIMITER ;
