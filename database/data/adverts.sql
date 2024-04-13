/*
Creates random adverts. All set as active.
*/

INSERT INTO `cfforum`.`adverts`
(`ID`,
`Name`,
`FromDateTime`,
`ToDateTime`,
`Logo`,
`LogoType`)
VALUES
(1,
'Advert 1',
DATE_ADD(NOW(), INTERVAL -90 DAY),
DATE_ADD(NOW(), INTERVAL 90 DAY),
'https://picsum.photos/50',
1);

INSERT INTO `cfforum`.`adverts`
(`ID`,
`Name`,
`FromDateTime`,
`ToDateTime`,
`Logo`,
`LogoType`)
VALUES
(2,
'Advert 2',
DATE_ADD(NOW(), INTERVAL -90 DAY),
DATE_ADD(NOW(), INTERVAL 90 DAY),
'https://picsum.photos/50',
1);

INSERT INTO `cfforum`.`adverts`
(`ID`,
`Name`,
`FromDateTime`,
`ToDateTime`,
`Logo`,
`LogoType`)
VALUES
(3,
'Advert 3',
DATE_ADD(NOW(), INTERVAL -90 DAY),
DATE_ADD(NOW(), INTERVAL 90 DAY),
'https://onlinetestcase.com/wp-content/uploads/2023/06/1MB.mp4',
2);

INSERT INTO `cfforum`.`adverts`
(`ID`,
`Name`,
`FromDateTime`,
`ToDateTime`,
`Logo`,
`LogoType`)
VALUES
(4,
'Advert 4',
DATE_ADD(NOW(), INTERVAL -90 DAY),
DATE_ADD(NOW(), INTERVAL 90 DAY),
'https://onlinetestcase.com/wp-content/uploads/2023/06/1MB.mp4',
2);