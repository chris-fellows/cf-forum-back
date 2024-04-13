/*
Creates example forum posts
*/

/* TABLE cfforum.posts */

SET @GroupID = (SELECT ID FROM cfforum.groups WHERE Name='Product 1 discussions');
SET @UserID = (SELECT ID FROM cfforum.users WHERE Email='chrismfellows@hotmail.co.uk');

/* Add root post */
INSERT INTO cfforum.posts
(
	GroupID,
    Text,
    UserID,
    CreatedDateTime,
    Sequence,
    RootPostID,
    ParentPostID
)
VALUES
(
	@GroupID,
    'Post 1 for topic',
    @UserID,
    NOW(),
    1,
    0,
    NULL
);

/* Set RootPostID */
SET @RootPostID =  LAST_INSERT_ID();
UPDATE cfforum.posts
SET RootPostID = ID	
WHERE ID = @RootPostID;

SELECT SLEEP(1);

  INSERT INTO cfforum.posts
		(
			GroupID,
			Text,
			UserID,
			CreatedDateTime,
			Sequence,
            RootPostID,
            ParentPostID
		)        
        WITH RECURSIVE
		cte AS ( SELECT 1 num 
         UNION ALL 
         SELECT num+1 FROM cte WHERE num < 50 )
		SELECT @GroupID,
			'Post XXX',
            @UserID,
            NOW(),
            CONVERT(cte.num + 1, SIGNED),
            @RootPostID,
            @RootPostID            
		FROM cte;

			/* ('Post ' + CONVERT((cte.num + 1), NCHAR) + ' for topic'),    */
/*
ADD_POSTS_LOOP: LOOP

	IF @sequence > 10 THEN
		LEAVE ADD_POSTS_LOOP;
	END IF;
END LOOP ADD_POSTS_LOOP;
*/

   /*
    INSERT INTO cfforum.posts
		(
			GroupID,
			Text,
			UserID,
			CreatedDateTime,
			Sequence,
            RootPostID,
            ParentPostID
		)
		VALUES
		(
			@GroupID,
			'First post for topic',
			@UserID,
			NOW(),
			1,
            @RootPostID,
            @RootPostID
		);
	*/


