CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `vw_posts_all_levels` AS
    SELECT 
        `p`.`ID` AS `ID`,
        `p`.`GroupID` AS `GroupID`,
        `p`.`Text` AS `Text`,
        `p`.`UserID` AS `UserID`,
        `p`.`CreatedDateTime` AS `CreatedDateTime`,
        `p`.`RootPostID` AS `RootPostID`,
        `p`.`ParentPostID` AS `ParentPostID`,
        `p`.`Level` AS `Level`
    FROM
        ((SELECT 
            `p1`.`ID` AS `ID`,
                `p1`.`GroupID` AS `GroupID`,
                `p1`.`Text` AS `Text`,
                `p1`.`UserID` AS `UserID`,
                `p1`.`CreatedDateTime` AS `CreatedDateTime`,
                `p1`.`Sequence` AS `Sequence`,
                `p1`.`RootPostID` AS `RootPostID`,
                `p1`.`ParentPostID` AS `ParentPostID`,
                1 AS `Level`,
                `p1`.`CreatedDateTime` AS `Sort1`,
                `p1`.`ID` AS `Sort2`,
                `p1`.`CreatedDateTime` AS `Sort3`,
                `p1`.`ID` AS `Sort4`,
                `p1`.`CreatedDateTime` AS `Sort5`,
                `p1`.`ID` AS `Sort6`,
                `p1`.`CreatedDateTime` AS `Sort7`,
                `p1`.`ID` AS `Sort8`
        FROM
            `posts` `p1` UNION SELECT 
            `p2`.`ID` AS `ID`,
                `p2`.`GroupID` AS `GroupID`,
                `p2`.`Text` AS `Text`,
                `p2`.`UserID` AS `UserID`,
                `p2`.`CreatedDateTime` AS `CreatedDateTime`,
                `p2`.`Sequence` AS `Sequence`,
                `p2`.`RootPostID` AS `RootPostID`,
                `p2`.`ParentPostID` AS `ParentPostID`,
                2 AS `Level`,
                `p1`.`CreatedDateTime` AS `Sort1`,
                `p1`.`ID` AS `Sort2`,
                `p2`.`CreatedDateTime` AS `Sort3`,
                `p2`.`ID` AS `Sort4`,
                `p2`.`CreatedDateTime` AS `Sort5`,
                `p2`.`ID` AS `Sort6`,
                `p2`.`CreatedDateTime` AS `Sort7`,
                `p2`.`ID` AS `Sort8`
        FROM
            ((`posts` `p1`
        JOIN `posts` `p2` ON ((`p2`.`ParentPostID` = `p1`.`ID`)))
        LEFT JOIN `posts` `p3` ON ((`p3`.`ParentPostID` = `p2`.`ID`)))
        WHERE
            (`p3`.`ID` IS NULL) UNION SELECT 
            `p3`.`ID` AS `ID`,
                `p3`.`GroupID` AS `GroupID`,
                `p3`.`Text` AS `Text`,
                `p3`.`UserID` AS `UserID`,
                `p3`.`CreatedDateTime` AS `CreatedDateTime`,
                `p3`.`Sequence` AS `Sequence`,
                `p3`.`RootPostID` AS `RootPostID`,
                `p3`.`ParentPostID` AS `ParentPostID`,
                3 AS `Level`,
                `p1`.`CreatedDateTime` AS `Sort1`,
                `p1`.`ID` AS `Sort2`,
                `p2`.`CreatedDateTime` AS `Sort3`,
                `p2`.`ID` AS `Sort4`,
                `p3`.`CreatedDateTime` AS `Sort5`,
                `p3`.`ID` AS `Sort6`,
                `p3`.`CreatedDateTime` AS `Sort7`,
                `p3`.`ID` AS `Sort8`
        FROM
            (((`posts` `p1`
        JOIN `posts` `p2` ON ((`p2`.`ParentPostID` = `p1`.`ID`)))
        JOIN `posts` `p3` ON ((`p3`.`ParentPostID` = `p2`.`ID`)))
        LEFT JOIN `posts` `p4` ON ((`p4`.`ParentPostID` = `p3`.`ID`)))
        WHERE
            (`p4`.`ID` IS NULL) UNION SELECT 
            `p4`.`ID` AS `ID`,
                `p4`.`GroupID` AS `GroupID`,
                `p4`.`Text` AS `Text`,
                `p4`.`UserID` AS `UserID`,
                `p4`.`CreatedDateTime` AS `CreatedDateTime`,
                `p4`.`Sequence` AS `Sequence`,
                `p4`.`RootPostID` AS `RootPostID`,
                `p4`.`ParentPostID` AS `ParentPostID`,
                4 AS `Level`,
                `p1`.`CreatedDateTime` AS `Sort1`,
                `p1`.`ID` AS `Sort2`,
                `p2`.`CreatedDateTime` AS `Sort3`,
                `p2`.`ID` AS `Sort4`,
                `p3`.`CreatedDateTime` AS `Sort5`,
                `p3`.`ID` AS `Sort6`,
                `p4`.`CreatedDateTime` AS `Sort7`,
                `p4`.`ID` AS `Sort8`
        FROM
            (((`posts` `p1`
        JOIN `posts` `p2` ON ((`p2`.`ParentPostID` = `p1`.`ID`)))
        JOIN `posts` `p3` ON ((`p3`.`ParentPostID` = `p2`.`ID`)))
        JOIN `posts` `p4` ON ((`p4`.`ParentPostID` = `p3`.`ID`)))) `p`
        JOIN `users` `u` ON ((`u`.`ID` = `p`.`UserID`)))
    ORDER BY `p`.`Sort1` , `p`.`Sort2` , `p`.`Sort3` , `p`.`Sort4` , `p`.`Sort5` , `p`.`Sort6` , `p`.`Sort7` , `p`.`Sort8`