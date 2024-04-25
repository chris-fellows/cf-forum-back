CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Users`(IN PageSize INT, IN PageNumber INT)
BEGIN
	DECLARE RowLimit INT DEFAULT PageSize;
    DECLARE RowOffset INT DEFAULT (PageNumber - 1) * PageSize;      
	/*const offset = (Number(req.query.pageNumber) - 1) * Number(req.query.pageSize);*/

	SELECT u.*
    FROM users u    
    ORDER BY u.Email LIMIT RowLimit OFFSET RowOffset;
END