CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Posts_By_Root_Post`(IN RootPostID INT, IN PageSize INT, IN PageNumber INT)
BEGIN
	DECLARE RowLimit INT DEFAULT PageSize;
    DECLARE RowOffset INT DEFAULT (PageNumber - 1) * PageSize;      
	/*const offset = (Number(req.query.pageNumber) - 1) * Number(req.query.pageSize);*/
        
    SELECT p.ID, p.GroupID, p.Text, p.UserID, p.CreatedDateTime,
		p.RootPostID, p.ParentPostID, p.Level,
		u.Name AS UserName, u.Logo AS UserLogo
	FROM
	(
		/* Level 1 */
		SELECT p1.*, 1 AS Level,		
			p1.CreatedDateTime as Sort1,
			p1.ID as Sort2,
			p1.CreatedDateTime as Sort3,
			p1.ID as Sort4,
			p1.CreatedDateTime as Sort5,
			p1.ID as Sort6,
			p1.CreatedDateTime as Sort7,
			p1.ID as Sort8
		FROM posts p1
		WHERE p1.ID = RootPostID
		UNION
		/* Level 2 (Reply to level 1) */
		SELECT p2.*, 2 AS Level,
			p1.CreatedDateTime as Sort1,
			p1.ID as Sort2,
			p2.CreatedDateTime as Sort3,
			p2.ID as Sort4,
			p2.CreatedDateTime as Sort5,
			p2.ID as Sort6,
			p2.CreatedDateTime as Sort7,
			p2.ID as Sort8
		FROM posts p1
			INNER JOIN posts p2 on p2.ParentPostID = p1.ID
			LEFT OUTER JOIN posts p3 on p3.ParentPostID = p2.ID
		WHERE p1.ID = RootPostID AND
			P3.ID is null
		UNION
		/* Level 3 (Reply to level 2) */
		SELECT p3.*, 3 AS Level,
			p1.CreatedDateTime as Sort1,
			p1.ID as Sort2,
			p2.CreatedDateTime as Sort3,
			p2.ID as Sort4,
			p3.CreatedDateTime as Sort5,
			p3.ID as Sort6,
			p3.CreatedDateTime as Sort7,
			p3.ID as Sort8
		FROM posts p1
			INNER JOIN posts p2 on p2.ParentPostID = p1.ID
			INNER JOIN posts p3 on p3.ParentPostID = p2.ID
			LEFT OUTER JOIN posts p4 on p4.ParentPostID = p3.ID
		WHERE p1.ID = RootPostID AND
			P4.ID is null
		UNION
		/* Level 4 (Reply to level 3) */
		SELECT p4.*, 4 AS Level,
			p1.CreatedDateTime as Sort1,
			p1.ID as Sort2,
			p2.CreatedDateTime as Sort3,
			p2.ID as Sort4,
			p3.CreatedDateTime as Sort5,
			p3.ID as Sort6,
			p4.CreatedDateTime as Sort7,
			p4.ID as Sort8
		FROM posts p1
			INNER JOIN posts p2 on p2.ParentPostID = p1.ID
			INNER JOIN posts p3 on p3.ParentPostID = p2.ID
			INNER JOIN posts p4 on p4.ParentPostID = p3.ID
		WHERE p1.ID = RootPostID
	) as p
	INNER JOIN users u on u.ID = p.UserID 
	order by p.Sort1, p.Sort2, p.Sort3, p.Sort4, p.Sort5, p.Sort6, p.Sort7, p.Sort8 LIMIT RowLimit OFFSET RowOffset;

	/*
	SELECT p.*, u.Name AS UserName, u.Logo AS UserLogo
	FROM cfforum.posts p
		INNER JOIN cfforum.users u on u.ID = p.UserID 
	WHERE p.RootPostID=RootPostID
	ORDER BY p.CreatedDateTime LIMIT RowLimit OFFSET RowOffset;
    */
END