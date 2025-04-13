DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Delete_Group_Tags_By_Group`(IN GroupID INT)
BEGIN		
    DELETE FROM group_tags gt WHERE gt.GroupID=GroupID;
END$$
DELIMITER ;
