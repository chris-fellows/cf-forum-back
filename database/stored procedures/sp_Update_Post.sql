CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Update_Post`(IN PostID INT, IN Text NVARCHAR(1000))
BEGIN
	UPDATE posts p SET p.Text=Text WHERE p.ID=PostID;
    
    SELECT p.*, u.Name AS UserName, u.Logo AS UserLogo
	FROM cfforum.posts p
		INNER JOIN cfforum.users u on u.ID = p.UserID
	WHERE p.ID=PostID;	    
END