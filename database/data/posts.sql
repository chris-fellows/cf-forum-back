/*
Creates example forum posts
*/

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
    'First post for topic',
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

SELECT SLEEP(2);

/* Add posts */
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
			'Message 2',
			@UserID,
			NOW(),
			2,
            @RootPostID,
            @RootPostID
		);
        
SELECT SLEEP(2);
        
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
			'Message 3',
			@UserID,
			NOW(),
			3,
            @RootPostID,
            @RootPostID
		);
        
SELECT SLEEP(2);
        
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
			'Message 4',
			@UserID,
			NOW(),
			4,
            @RootPostID,
            @RootPostID
		);
        
SELECT SLEEP(2);

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
			'Message 5',
			@UserID,
			NOW(),
			5,
            @RootPostID,
            @RootPostID
		);

/*
SET @sequence = 1;
WHILE @sequence < 10 DO
END WHILE;
WHILE @PostSequence < 10 DO
	SET @PostSequence = @PostSequence + 1;
END;
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


