/* Clear existing data */
TRUNCATE TABLE `cfforum`.`user_role_function_types`;
TRUNCATE TABLE `cfforum`.`user_roles`;
TRUNCATE TABLE `cfforum`.`user_role_functions`;

/* Add user role function types */
INSERT INTO `cfforum`.`user_role_function_types`
(`ID`,
`Name`,
`InternalName`)
VALUES
(1,
'Create post',
'CREATE_POST');

INSERT INTO `cfforum`.`user_role_function_types`
(`ID`,
`Name`,
`InternalName`)
VALUES
(2,
'Update post',
'UPDATE_POST');

INSERT INTO `cfforum`.`user_role_function_types`
(`ID`,
`Name`,
`InternalName`)
VALUES
(3,
'Delete post',
'DELETE_POST');

INSERT INTO `cfforum`.`user_role_function_types`
(`ID`,
`Name`,
`InternalName`)
VALUES
(4,
'Manage users',
'MANAGE_USERS');

INSERT INTO `cfforum`.`user_role_function_types`
(`ID`,
`Name`,
`InternalName`)
VALUES
(5,
'Alert events',
'ALERT_EVENTS');

/* Add user roles */
INSERT INTO `cfforum`.`user_roles`
(`ID`,
`Name`,
`InternalName`)
VALUES
(1,
'Administrator',
'ADMIN');

INSERT INTO `cfforum`.`user_roles`
(`ID`,
`Name`,
`InternalName`)
VALUES
(2,
'User',
'USER');

/* Add user role functions for ADMIN */
INSERT INTO `cfforum`.`user_role_functions`
(`UserRoleID`,
`UserRoleFunctionTypeID`)
SELECT 1, ID
FROM `cfforum`.`user_role_function_types`;

/* Add user role functions for USER */
INSERT INTO `cfforum`.`user_role_functions`
(`UserRoleID`,
`UserRoleFunctionTypeID`)
SELECT 2, ID
FROM `cfforum`.`user_role_function_types`
WHERE InternalName NOT IN ('MANAGE_USERS','ALERT_EVENTS');
