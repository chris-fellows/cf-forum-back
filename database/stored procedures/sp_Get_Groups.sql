DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Groups`(IN Find NVARCHAR(100))
BEGIN
	SELECT g.* 
    FROM cfforum.groups g
    WHERE (
			(Find IS NULL) OR
            (Find = '') OR
            (g.Name LIKE CONCAT('%',Find,'%'))
		)
    ORDER BY g.Name;
END$$
DELIMITER ;
