DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Add_Tag`(IN Name VARCHAR(50))
BEGIN		
	INSERT INTO tags(Name)  
    VALUES (Name);
        
   	SELECT t.*
	FROM cfforum.tags t		
	WHERE t.ID = LAST_INSERT_ID()
	ORDER BY t.Name;
END$$
DELIMITER ;
