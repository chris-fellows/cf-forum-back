CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Posts_By_Root_Post`(IN RootPostID INT, IN PageSize INT, IN PageNumber INT)
BEGIN
	DECLARE RowLimit INT DEFAULT PageSize;
    DECLARE RowOffset INT DEFAULT (PageNumber - 1) * PageSize;      
	/*const offset = (Number(req.query.pageNumber) - 1) * Number(req.query.pageSize);*/
        
    SELECT p.ID, p.GroupID, p.Text, p.UserID, p.CreatedDateTime,
		p.RootPostID, p.ParentPostID, p.Level,
		u.Name AS UserName, u.Logo AS UserLogo
	FROM vw_posts_all_levels p
		INNER JOIN users u on u.ID = p.UserID
	WHERE p.RootPostID = RootPostID
	ORDER BY p.Sort1, p.Sort2, p.Sort3, p.Sort4, p.Sort5, p.Sort6, p.Sort7, p.Sort8 LIMIT RowLimit OFFSET RowOffset;

	/*
	SELECT p.*, u.Name AS UserName, u.Logo AS UserLogo
	FROM cfforum.posts p
		INNER JOIN cfforum.users u on u.ID = p.UserID 
	WHERE p.RootPostID=RootPostID
	ORDER BY p.CreatedDateTime LIMIT RowLimit OFFSET RowOffset;
    */
END