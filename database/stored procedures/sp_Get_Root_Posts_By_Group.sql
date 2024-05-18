DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Root_Posts_By_Group`(IN GroupID INT, IN Find NVARCHAR(100), IN PageSize INT, IN PageNumber INT)
BEGIN
	DECLARE RowLimit INT DEFAULT PageSize;
    DECLARE RowOffset INT DEFAULT (PageNumber - 1) * PageSize;      
	/*const offset = (Number(req.query.pageNumber) - 1) * Number(req.query.pageSize);*/
    
	SELECT p.*, u.Name AS UserName, u.Logo AS UserLogo
	FROM posts p
		INNER JOIN users u on u.ID = p.UserID
	WHERE p.ID=p.RootPostID AND 
		p.GroupID = GroupID AND
        (
			(Find IS NULL) OR
            (Find = '') OR
            (p.Text LIKE CONCAT('%',Find,'%'))
		)
    ORDER BY p.CreatedDateTime LIMIT RowLimit OFFSET RowOffset;
END$$
DELIMITER ;
