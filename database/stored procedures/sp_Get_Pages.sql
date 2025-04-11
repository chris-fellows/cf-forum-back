DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Pages`()
BEGIN
	SELECT p.* 
    FROM cfforum.pages p    
    ORDER BY p.Name;
END$$
DELIMITER ;
