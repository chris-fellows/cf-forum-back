DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Content_Summaries`()
BEGIN
	SELECT c.ID, C.Name
    FROM contents c
    ORDER BY c.Name;
END$$
DELIMITER ;
