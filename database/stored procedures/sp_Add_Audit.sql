DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Add_Audit`(IN EventTypeIDInternalName NVARCHAR(100), IN UserID INT, IN Data JSON)
BEGIN
	SELECT et.ID
    INTO @EventTypeID
    FROM event_types et
    WHERE et.InternalName = EventTypeIDInternalName; 		

	INSERT INTO audit(EventTypeID, UserID, CreatedDateTime, Data)  
    VALUES (@EventTypeID, UserID, NOW(), Data);
END$$
DELIMITER ;
