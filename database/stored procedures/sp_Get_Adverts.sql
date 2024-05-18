DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Adverts`(IN Find NVARCHAR(100), IN PageSize INT, IN PageNumber INT)
BEGIN
	DECLARE RowLimit INT DEFAULT PageSize;
    DECLARE RowOffset INT DEFAULT (PageNumber - 1) * PageSize;      	

	SELECT a.*
    FROM adverts a
    WHERE (
			(Find IS NULL) OR
            (Find = '') OR
            (a.Name LIKE CONCAT('%',Find,'%'))
		)
    ORDER BY a.ToDateTime LIMIT RowLimit OFFSET RowOffset;
END$$
DELIMITER ;
