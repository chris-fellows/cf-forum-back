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
'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
2);

INSERT INTO `cfforum`.`adverts`
(`ID`,
`Name`,
`FromDateTime`,
`ToDateTime`,
`Logo`,
`LogoType`)
VALUES
(5,
'Advert 4',
DATE_ADD(NOW(), INTERVAL -90 DAY),
DATE_ADD(NOW(), INTERVAL 90 DAY),
'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
2);

INSERT INTO `cfforum`.`adverts`
(`ID`,
`Name`,
`FromDateTime`,
`ToDateTime`,
`Logo`,
`LogoType`)
VALUES
(6,
'Advert 4',
DATE_ADD(NOW(), INTERVAL -90 DAY),
DATE_ADD(NOW(), INTERVAL 90 DAY),
'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
2);