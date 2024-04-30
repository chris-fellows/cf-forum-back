DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Add_Post`(IN GroupID INT, IN Text NVARCHAR(1000), IN UserID INT, IN RootPostID INT, IN ParentPostID INT)
BEGIN		
	INSERT INTO posts(GroupID, Text, UserID, CreatedDateTime, Sequence, RootPostID, ParentPostID)  
    VALUES (GroupID, Text, UserID, NOW(), 0, RootPostID, ParentPostID);
        
   	SELECT p.*, u.Name AS UserName, u.Logo AS UserLogo
	FROM cfforum.posts p
		INNER JOIN cfforum.users u on u.ID = p.UserID
	WHERE p.ID = LAST_INSERT_ID()
	ORDER BY p.CreatedDateTime;    
END$$
DELIMITER ;
