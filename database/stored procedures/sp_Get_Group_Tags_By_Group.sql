DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Group_Tags_By_Group`(IN GroupID INT)
BEGIN		    
   	SELECT gt.*, t.Name AS TagName
	FROM cfforum.group_tags gt		 
        INNER JOIN cfforum.tags t ON t.ID = gt.TagID
	WHERE gt.GroupID=GroupID
	ORDER BY t.Name;
END$$
DELIMITER ;
