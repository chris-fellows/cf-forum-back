DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Users`(IN Find NVARCHAR(100), IN PageSize INT, IN PageNumber INT)
BEGIN
	DECLARE RowLimit INT DEFAULT PageSize;
    DECLARE RowOffset INT DEFAULT (PageNumber - 1) * PageSize;      
	/*const offset = (Number(req.query.pageNumber) - 1) * Number(req.query.pageSize);*/

	SELECT u.*,
		ur.Name as UserRoleName,
        ur.InternalName as UserRoleInternalName
    FROM users u   
		INNER JOIN user_roles ur on ur.ID = u.RoleID
    WHERE (
			(Find IS NULL) OR
            (Find = '') OR
            (u.Name LIKE CONCAT('%',Find,'%'))
		)
    ORDER BY u.Email LIMIT RowLimit OFFSET RowOffset;
END$$
DELIMITER ;
