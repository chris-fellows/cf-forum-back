DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Advert`(IN ID INT)
BEGIN
	SELECT a.*
    FROM adverts a
    WHERE a.ID = ID;    
END$$
DELIMITER ;
