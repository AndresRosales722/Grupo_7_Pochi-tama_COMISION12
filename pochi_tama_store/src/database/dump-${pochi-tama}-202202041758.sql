-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: pochi_tama
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `postal_code` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_FK` (`user_id`),
  CONSTRAINT `addresses_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'3 de febrero','guaymallen','mendoza',982,5539,1);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `banner` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Coleccionables','coleccionables.jpg'),(2,'Tazas','tazas.jpg'),(3,'Lamparas','lamparas.jpg'),(4,'Figuras','banner.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_items_un` (`id`),
  KEY `order_items_FK` (`product_id`),
  KEY `order_items_FK_1` (`order_id`),
  CONSTRAINT `order_items_FK` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `order_items_FK_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_un` (`id`),
  KEY `orders_FK` (`user_id`),
  CONSTRAINT `orders_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_images_FK` (`product_id`),
  CONSTRAINT `products_images_FK` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (43,'1643990796734_img_.jpg',25),(44,'1643990796741_img_.jpg',25),(45,'1643990796786_img_.jpg',25),(46,'1643990796797_img_.jpg',25),(51,'1643991288875_img_.jpg',27),(52,'1643991288876_img_.jpg',27),(53,'1643991288877_img_.jpg',27),(54,'1643991288881_img_.jpg',27),(56,'1643991587381_img_.jpg',29),(57,'1643991587382_img_.jpg',29),(58,'1643991587385_img_.jpg',29),(59,'1643991587386_img_.jpg',29);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` int(11) unsigned NOT NULL,
  `discount` int(11) unsigned DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `subcategory_id` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `subcategory_id` (`subcategory_id`),
  CONSTRAINT `subcategory` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (25,'Casco Iron Man Electrónico Con Luz Y Sonidos',6000,5,'CASCO ELECTRONICO IRON MAN MARVEL LEGENDS SERIE\r\n\r\nLa armadura adaptable de Iron Man fue construida para aplastar el crimen y eliminar la injusticia. El casco electrónico Marvel Legends Iron Man es un tributo a la tecnología de punta desarrollada por Stark Industries.\r\n\r\nAcabado de Lujo!!\r\nOjos de Led\r\nEfectos de sonido electrónicos\r\nPlaca frontal desmontable magnetizada\r\nUtiliza pilas AAA (No incluidas)',4,'2022-02-04 16:06:36','2022-02-04 16:06:36'),(27,'Marvel Avengers: Endgame - Hacha electrónica ',7000,10,'El poderoso Thor, hijo de Odín, usa sus superpoderes para proteger del mal tanto a su pueblo Asgard como al planeta Tierra. Este posee un hacha desde que su malvada hermana destruyó su martillo Mjölnir. El hacha fue forjada para ayudar a los Vengadores a derrotar a Thanos, el titán loco. Fans y coleccionistas pueden crear momentos emocionantes con el poder del trueno que retumba en sus manos mientras empuñas el Hacha Stormbreaker inspirado en la película Avengers: Endgame',4,'2022-02-04 16:14:48','2022-02-04 16:14:48'),(29,'Casco electrónico de Iron Spider de Marvel',7000,10,'¡Equipado con la armadura de Iron Spider, Spider-Man está listo para la acción! Inspirado en el universo Marvel, este artículo premium para roleplay a escala completa 1:1 de Marvel Legends Series viene con muchos detalles y cuenta con luces electrónicas. Este casco tiene ojos LED brillantes, que brillan en rojo y azul en 6 ajustes diferentes de luces.',4,'2022-02-04 16:19:47','2022-02-04 16:19:47');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `category_id` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `categoria_id` (`category_id`),
  CONSTRAINT `categoria` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Funkos pop',1,NULL,NULL),(2,'Peliculas y series',1,NULL,NULL),(3,'Anime',1,NULL,NULL),(4,'Marvel',1,NULL,NULL),(5,'Dc',1,NULL,NULL),(6,'Videojuegos',1,NULL,NULL),(7,'Dc',2,NULL,NULL),(8,'Marvel',2,NULL,NULL),(9,'Videojuegos',2,NULL,NULL),(10,'Boku no hero',2,NULL,NULL),(11,'Naruto',2,NULL,NULL),(12,'One piece',2,NULL,NULL),(13,'Peliculas y series',2,NULL,NULL),(14,'Star wars',3,NULL,NULL),(15,'Infantiles',3,NULL,NULL),(16,'Videojuegos',3,NULL,NULL),(17,'Naruto',3,NULL,NULL),(18,'Harry potter',3,NULL,NULL),(19,'Shingeki no kyojin',3,NULL,NULL),(20,'Marvel',3,NULL,NULL),(21,'Dc',3,NULL,NULL),(22,'Peliculas y series',4,NULL,NULL),(23,'Among us',4,NULL,NULL),(24,'Marvel',4,NULL,NULL),(25,'Dc',4,NULL,NULL),(26,'Videojuegos',4,NULL,NULL),(27,'Naruto',4,NULL,NULL),(28,'One piece',4,NULL,NULL),(29,'Boku no hero',4,NULL,NULL);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(60) NOT NULL,
  `pass` varchar(70) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `rol` int(2) NOT NULL DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'andres','rosales','andres@gmail.com','12345','2613334680',0,NULL,NULL,'defaultImage.jpg'),(2,'Jose','gonzales','jose@gmail.com','$2a$10$F8AzVVuWtt21WlVtSQL0euZzfMrXAdrvT6PrjT8JHHg22L5hCBbdG',NULL,0,'2022-01-30 21:03:55','2022-01-30 21:03:55','1643576632973_img_.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'pochi_tama'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-04 17:58:41
