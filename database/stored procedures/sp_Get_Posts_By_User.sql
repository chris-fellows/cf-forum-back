CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Posts_By_User`(IN UserID INT, IN PageSize INT, IN PageNumber INT)
BEGIN
	DECLARE RowLimit INT DEFAULT PageSize;
    DECLARE RowOffset INT DEFAULT (PageNumber - 1) * PageSize;      
	/*const offset = (Number(req.query.pageNumber) - 1) * Number(req.query.pageSize);*/
    
	SELECT p.*, u.Name AS UserName, u.Logo AS UserLogo
	FROM cfforum.posts p
		INNER JOIN cfforum.users u on u.ID = p.UserID
	WHERE p.UserID=UserID
	ORDER BY p.CreatedDateTime LIMIT RowLimit OFFSET RowOffset;
END