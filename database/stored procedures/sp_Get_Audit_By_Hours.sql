DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Audit_By_Hours`(IN HoursOfData INT, IN PageSize INT, IN PageNumber INT,
								IN CurrentUserID INT)
BEGIN
	DECLARE RowLimit INT DEFAULT PageSize;
    DECLARE RowOffset INT DEFAULT (PageNumber - 1) * PageSize;      
    
	SELECT a.ID, a.CreatedDateTime, a.UserID, a.Data,
		u.Name as UserName,
		et.Name as EventTypeName,
        et.InternalName as EventTypeInternalName
    FROM audit a
		INNER JOIN event_types et ON et.ID = a.EventTypeID
        LEFT OUTER JOIN users u on u.ID = a.UserID
	ORDER BY a.CreatedDateTime LIMIT RowLimit OFFSET RowOffset;
END$$
DELIMITER ;
