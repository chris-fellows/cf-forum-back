DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Content_By_Name`(IN Name NVARCHAR(50))
BEGIN	
	SELECT c.*
	FROM contents c		
	WHERE c.Name=Name;
END$$
DELIMITER ;
