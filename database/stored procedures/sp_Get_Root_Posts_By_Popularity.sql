DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Root_Posts_By_Popularity`(IN Find NVARCHAR(100), IN PageSize INT, IN PageNumber INT)
BEGIN
	DECLARE RowLimit INT DEFAULT PageSize;
    DECLARE RowOffset INT DEFAULT (PageNumber - 1) * PageSize;      
	/*const offset = (Number(req.query.pageNumber) - 1) * Number(req.query.pageSize);*/
    
	SELECT (SELECT COUNT(1) FROM posts p2 WHERE p2.RootPostID = p.ID AND p2.ID <> P2.RootPostID) AS CountPosts,
        p.*, u.Name AS UserName, u.Logo AS UserLogo
	FROM posts p
		INNER JOIN users u on u.ID = p.UserID
	WHERE p.ID=p.RootPostID AND 		
        (
			(Find IS NULL) OR
            (Find = '') OR
            (p.Text LIKE CONCAT('%',Find,'%'))
		)
    ORDER BY 1 DESC LIMIT RowLimit OFFSET RowOffset;
END$$
DELIMITER ;
