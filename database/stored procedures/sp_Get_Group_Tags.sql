DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Group_Tags`()
BEGIN		    
   	SELECT gt.*, t.Name AS TagName
	FROM cfforum.group_tags gt		 
        INNER JOIN cfforum.tags t ON t.ID = gt.TagID	
	ORDER BY gt.GroupID, t.Name;
END$$
DELIMITER ;
