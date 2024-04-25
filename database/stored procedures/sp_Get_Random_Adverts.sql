CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Get_Random_Adverts`(IN AdvertCount INT)
BEGIN
	SELECT a.* 
    FROM adverts a
	WHERE NOW() >= a.FromDateTime AND NOW() < a.ToDateTime
	ORDER BY RAND() LIMIT AdvertCount;
END