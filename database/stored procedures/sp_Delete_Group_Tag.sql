DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Add_Group_Tag`(IN ID INT)
BEGIN		
    DELETE FROM group_tags gt WHERE gt.ID=ID;
END$$
DELIMITER ;
