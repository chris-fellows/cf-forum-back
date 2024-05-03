CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Update_User_Post_Info`(IN UserID INT, IN PostID INT, IN Vote TINYINT, IN Track TINYINT)
BEGIN
	/* Check if user_post_info exists */
	SELECT upi.ID
    INTO @ID
    FROM user_post_info upi
    WHERE upi.UserID = UserID AND
		upi.PostID = PostID;        
	      
	IF @ID IS NOT NULL THEN
		UPDATE user_post_info
        SET Vote = Vote,
			Track = Track
		WHERE ID = @ID;
	ELSE
		INSERT INTO user_post_info(UserID, PostID, Vote, Track)
        VALUES (UserID, PostID, Vote, Track);    
    END IF;
END