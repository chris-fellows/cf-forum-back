INSERT INTO `cfforum`.`users`
(`ID`,
`Name`,
`Email`,
`Active`,
`Logo`)
VALUES
(1,
'Chris Fellows',
'chrismfellows@hotmail.co.uk',
1,
null);

/*
DELETE FROM `cfforum`.`user_roles` 
WHERE UserID = 1;
*/

INSERT INTO `cfforum`.`user_roles`
(`ID`,
`UserID`,
`UserRoleTypeID`)
SELECT NULL, U.ID, URT.ID
FROM `cfforum`.`users` U
	INNER JOIN `cfforum`.`user_role_types` URT ON URT.InternalName IN ('CREATE_POST','DELETE_POST','UPDATE_POST')
WHERE U.ID = 1;


INSERT INTO `cfforum`.`users`
(`ID`,
`Name`,
`Email`,
`Active`,
`Logo`)
VALUES
(2,
'Chris Fellows 2',
'chrisfellows90{@gmail.com',
1,
null);

/*
DELETE FROM `cfforum`.`user_roles` 
WHERE UserID = 2;
*/

INSERT INTO `cfforum`.`user_roles`
(`ID`,
`UserID`,
`UserRoleTypeID`)
SELECT NULL, U.ID, URT.ID
FROM `cfforum`.`users` U
	INNER JOIN `cfforum`.`user_role_types` URT ON URT.InternalName IN ('CREATE_POST','DELETE_POST','UPDATE_POST')
WHERE U.ID = 2;

