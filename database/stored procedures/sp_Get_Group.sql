CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Group`(IN ID INT)
BEGIN
	SELECT g.* 
    FROM cfforum.groups g
    WHERE g.ID = ID
    ORDER BY g.Name;
END