CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Groups`()
BEGIN
	SELECT g.* 
    FROM cfforum.groups g
    ORDER BY g.Name;
END