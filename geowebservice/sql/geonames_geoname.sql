-- MySQL dump 10.13  Distrib 5.6.24, for linux-glibc2.5 (x86_64)
--
-- Host: 127.0.0.1    Database: geonames
-- ------------------------------------------------------
-- Server version	5.6.25-0ubuntu0.15.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `geoname`
--

DROP TABLE IF EXISTS `geoname`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `geoname` (
  `geonameid` int(11) NOT NULL,
  `name` varchar(2000) CHARACTER SET utf8 DEFAULT NULL,
  `asciiname` varchar(2000) CHARACTER SET utf8 DEFAULT NULL,
  `alternatenames` varchar(4000) CHARACTER SET utf8 DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `fclass` char(1) CHARACTER SET utf8 DEFAULT NULL,
  `fcode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `country` varchar(2) CHARACTER SET utf8 DEFAULT NULL,
  `cc2` varchar(600) CHARACTER SET utf8 DEFAULT NULL,
  `admin1` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `admin2` varchar(800) CHARACTER SET utf8 DEFAULT NULL,
  `admin3` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `admin4` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  UNIQUE KEY `idx_geoname_geonameid` (`geonameid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-10-27 19:13:52
