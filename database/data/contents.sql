/*
Creates contents list. E.g. Customisable HTML content to display.
*/

INSERT INTO `cfforum`.`contents`
(`ID`,
`Name`,
`Data`)
VALUES
(1,
'None',
'');

INSERT INTO `cfforum`.`contents`
(`ID`,
`Name`,
`Data`)
VALUES
(2,
'Test 1',
'<div>This is test 1</div>');

INSERT INTO `cfforum`.`contents`
(`ID`,
`Name`,
`Data`)
VALUES
(3,
'Home Message',
'<p><b>This is a message for the Home page</b></p><p>The content for this message is stored in the database.</p>');

INSERT INTO `cfforum`.`contents`
(`ID`,
`Name`,
`Data`)
VALUES
(4,
'Site Maintenance Message',
'<p>The site is undergoing maintenance.</p><p>Please check again later.</p>');


