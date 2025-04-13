INSERT INTO `cfforum`.`groups`
(`ID`,
`Name`,
`Description`,
`Active`,
`Logo`)
VALUES
(1,
'Product 1 discussions',
'Discussions of product 1',
1,
'https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg');

INSERT INTO `cfforum`.`groups`
(`ID`,
`Name`,
`Description`,
`Active`,
`Logo`)
VALUES
(2,
'Product 2 discussions',
'Discussions of product 2',
1,
'https://farm8.staticflickr.com/7377/9359257263_81b080a039_z_d.jpg');

INSERT INTO `cfforum`.`groups`
(`ID`,
`Name`,
`Description`,
`Active`,
`Logo`)
VALUES
(3,
'Product 3 discussions',
'Discussions of product 3',
1,
'https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg');


INSERT INTO `cfforum`.`group_tags`
(`ID`,
`GroupID`,
`TagID`)
VALUES
(1,
1,
2);

INSERT INTO `cfforum`.`group_tags`
(`ID`,
`GroupID`,
`TagID`)
VALUES
(2,
1,
3);

INSERT INTO `cfforum`.`group_tags`
(`ID`,
`GroupID`,
`TagID`)
VALUES
(1,
1,
2);

INSERT INTO `cfforum`.`group_tags`
(`ID`,
`GroupID`,
`TagID`)
VALUES
(3,
2,
2);

INSERT INTO `cfforum`.`group_tags`
(`ID`,
`GroupID`,
`TagID`)
VALUES
(4,
2,
3);

INSERT INTO `cfforum`.`group_tags`
(`ID`,
`GroupID`,
`TagID`)
VALUES
(5,
3,
2);

INSERT INTO `cfforum`.`group_tags`
(`ID`,
`GroupID`,
`TagID`)
VALUES
(6,
3,
3);