INSERT INTO audit(EventTypeID, UserID, CreatedDateTime, Data)
SELECT 4, p.UserID, p.CreatedDateTime, CONCAT('{"postid": ', CAST(p.ID AS NCHAR), '}')
FROM posts p;
