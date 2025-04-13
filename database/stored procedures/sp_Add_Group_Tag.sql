DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Add_Group_Tag`(IN GroupID INT, IN TagID INT)
BEGIN		
    DELETE FROM group_tags gt WHERE gt.GroupID=GroupID AND gt.ID=TagID;    

	INSERT INTO group_tags(GroupID, TagID)
    VALUES (GroupID, TagID);
        
   	SELECT gt.*, t.Name AS TagName
	FROM cfforum.group_tags gt		 
        INNER JOIN cfforum.tags t ON t.ID = gt.TagID
	WHERE gt.ID = LAST_INSERT_ID()
	ORDER BY t.Name;
END$$
DELIMITER ;
