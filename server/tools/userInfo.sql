/*
* @Author: Venus-Lin
* @Date:   2018-10-17 15:19:14
* @Last Modified by:   Venus-Lin
* @Last Modified time: 2018-10-17 15:19:50
*/
 CREATE TABLE `userInfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;