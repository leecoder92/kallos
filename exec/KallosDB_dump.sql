-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: kallosDB
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `item_id` bigint NOT NULL AUTO_INCREMENT,
  `author_address` varchar(255) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `description` varchar(255) NOT NULL,
  `item_img` varchar(255) NOT NULL,
  `on_saleyn` int DEFAULT '0',
  `owner_address` varchar(255) NOT NULL,
  `price` double DEFAULT '0',
  `title` varchar(255) NOT NULL,
  `token_id` varchar(255) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b','naong','2022-04-07 22:01:14.008322','알겠어요?','14e8fa07-94de-4b18-ac23-e1a48c89b5a4.png',1,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b',10,'금지입니다','1'),(2,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0','Sue','2022-04-07 22:01:28.758986','괜찮아 내일은 더 밝을테니까','24f91a5e-c6ec-4add-b71d-fd52fb2c71ed.jpg',1,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0',0.05,'괜찮아','2'),(3,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50','daye','2022-04-07 22:01:31.409760','빛나려고 노력하지마,, 넌, 이미 별이야~','9f3978c9-bfd7-4f8f-b8d1-af97c4230297.jpg',0,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50',0,'별','3'),(4,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b','naong','2022-04-07 22:01:57.624976','깽깽이 발로 갈까요','a45505b3-31fb-4d95-83e7-33f70e483ebc.png',1,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b',0.5,'보라색 맛 났어~','4'),(5,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0','Sue','2022-04-07 22:02:12.662369','난 나야','9b80f05a-07d5-4c06-b5e0-cf96cbac1226.jpg',1,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0',0.03,'난 나야','5'),(6,'0x355170d0c1c654faa0d318f07394568c006fabdb','준','2022-04-07 22:02:17.204074','CSS는 완벽합니다.','cc4116ab-72e0-4df1-b106-7e8aa61835c8.png',0,'0x355170d0c1c654faa0d318f07394568c006fabdb',0,'css is awesome','6'),(7,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b','naong','2022-04-07 22:02:22.129202','너두 할 수 있어','f3018bb0-b8f5-487c-bb45-0bf5f54ffb76.png',0,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0',0,'야','7'),(8,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0','Sue','2022-04-07 22:02:50.380457','오늘보다 내일 더','45db56e0-86b3-4654-933b-112d23a2ab9c.jpg',1,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0',0.06,'오늘내일','8'),(9,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b','naong','2022-04-07 22:02:58.480848','차차차','2c386be4-cacd-440f-8c59-57ac742e479f.png',1,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b',1,'바보','9'),(10,'0x355170d0c1c654faa0d318f07394568c006fabdb','준','2022-04-07 22:03:01.802310','민들레처럼 강한 생명력을 가지자','8b096ed8-d89e-48db-921c-6b5d1b83fe15.png',0,'0x355170d0c1c654faa0d318f07394568c006fabdb',0,'민들레','10'),(11,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50','daye','2022-04-07 22:03:18.045507','너의 이번 해를 기원할게,,, 반짝반짝 빛나길,,','7bdaec11-a4dc-44d1-ae44-c21cdb4e9534.jpg',1,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50',0.03,'한 해 기원','11'),(12,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b','naong','2022-04-07 22:03:39.443584','유일한 마약...','eb6f048f-7a08-4cee-b483-25e781848186.png',0,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b',0,'마약','12'),(13,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0','Sue','2022-04-07 22:03:42.105029','일주일의 체감 시간을 표현해봤습니다.','50ea2982-0b01-407a-821b-4abfb4079684.jpg',1,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0',0.9,'일주일','13'),(14,'0x355170d0c1c654faa0d318f07394568c006fabdb','준','2022-04-07 22:03:59.947194','나의 유일한 취미는 당신이에요','0ecf1c04-9aad-4572-825f-2239141bcd7f.png',0,'0x355170d0c1c654faa0d318f07394568c006fabdb',0,'취미','14'),(15,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b','naong','2022-04-07 22:04:15.690026','배추 셀 때 쓰는 말이야','08d3b959-d545-41a5-b880-b66f56f61229.png',0,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b',0,'포기는','15'),(16,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0','Sue','2022-04-07 22:04:32.884326','희귀템','09759a70-7a43-43a7-ab5e-c29f601f81c1.jpg',1,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0',0.4,'싸인','16'),(17,'0x355170d0c1c654faa0d318f07394568c006fabdb','준','2022-04-07 22:04:35.799829','저의 최애 음식이죠','a84c4851-1d00-4ae6-9b03-92c5bd5ec6e3.png',0,'0x355170d0c1c654faa0d318f07394568c006fabdb',0,'라면','17'),(18,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b','naong','2022-04-07 22:05:02.339712','print(\"LOVE\")','1ee1e4fc-50a5-4337-b227-c166bce12d38.png',1,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b',0.003,'LOVE','18'),(19,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50','daye','2022-04-07 22:05:05.230703','힘내! 너가 하는 모든 일이 잘 될 거야! 항상 응원할게','6a804c81-4f09-4263-bd89-bc376198f7f5.jpg',1,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50',0.05,'힘내!','19'),(20,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0','Sue','2022-04-07 22:05:14.041285','벚꽃향기','acff6f2c-4c1b-4259-ad14-7a132002f5bb.jpg',1,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0',0.1,'봄','21'),(21,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0','Sue','2022-04-07 22:05:54.800601','뭉개뭉개 구름 속','165972d3-606f-4e42-a8df-9d54594c9d23.jpg',1,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0',1.5,'두둥실','22'),(22,'0x355170d0c1c654faa0d318f07394568c006fabdb','준','2022-04-07 22:06:12.907748','사계절 내내 그대만 생각나요','44206828-6987-4e23-854a-ada17bd9c47e.png',0,'0x355170d0c1c654faa0d318f07394568c006fabdb',0,'계절','23'),(23,'0x355170d0c1c654faa0d318f07394568c006fabdb','준','2022-04-07 22:06:56.492706','튜닝의 끝은 순정이라고 했죠','9df4695c-c486-491a-a7dd-878de14337c1.png',0,'0x355170d0c1c654faa0d318f07394568c006fabdb',0,'Simple is best','24'),(24,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50','daye','2022-04-07 22:07:03.384184','여름아 달려오지마,,천천히 오렴,,난 좀 더 봄을 즐기고 싶단다','1bd0281e-ab7b-4f90-947b-5f034e0ac288.jpg',1,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50',0.04,'여름','25'),(25,'0x355170d0c1c654faa0d318f07394568c006fabdb','준','2022-04-07 22:07:23.700993','그대가 사무치게 그리워요','332e6591-a818-446b-b467-fad66d45d821.png',0,'0x355170d0c1c654faa0d318f07394568c006fabdb',0,'그리움','26'),(26,'0x355170d0c1c654faa0d318f07394568c006fabdb','준','2022-04-07 22:07:58.749404','슬픔과 눈물의 이중성','9fff97e5-ba4d-4324-8c01-cc938bff16ae.png',0,'0x355170d0c1c654faa0d318f07394568c006fabdb',0,'눈물','27'),(27,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50','daye','2022-04-07 22:08:21.169669','성공한 사람이 아니라 가치있는 사람이 되어라.. 명언이네요.. 가치있는 사람이 되기위해 노력합시다!!','d59c24f1-3d71-47eb-8f48-e895dd03f511.jpg',0,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50',0,'사람','28'),(28,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0','Sue','2022-04-07 22:08:38.521123','SSAFY의 형상화','42a289b0-b375-400d-80cc-95a70dfeae3b.jpg',1,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0',0.7,'SSAFY','29'),(29,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50','daye','2022-04-07 22:09:26.757246','꽃피는 봄이 옵니다 벚꽃 보러 갑시다~~','6b0ed344-6b7c-466e-8025-30a1931df187.jpg',0,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50',0,'봄','30'),(30,'0x146493adc84a15ac391d6d570a85adbbecfec19a','GT','2022-04-07 22:10:11.901247','핫식스!','2481e5bc-a254-4814-aee6-699db7485501.JPG',1,'0x146493adc84a15ac391d6d570a85adbbecfec19a',666,'열정 6기','31'),(31,'0x146493adc84a15ac391d6d570a85adbbecfec19a','GT','2022-04-07 22:10:34.175225','완 벽','a4f9ba74-da82-4026-9b61-775d14e205b8.JPG',1,'0x146493adc84a15ac391d6d570a85adbbecfec19a',0.5,'뽈락체인','32'),(32,'0x146493adc84a15ac391d6d570a85adbbecfec19a','GT','2022-04-07 22:11:10.849516','약자가 아닌 축복 받은 이들을 위한 것이다','8221f8e5-8efa-49d4-a0b3-a564659a64eb.JPG',0,'0x146493adc84a15ac391d6d570a85adbbecfec19a',0,'잠은...','33'),(33,'0x146493adc84a15ac391d6d570a85adbbecfec19a','GT','2022-04-07 22:11:56.956174','우리팀은 너무 뻔뻔해요','abdfe00b-1f72-4fb8-97d2-5f7888dc065c.JPG',0,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50',0,'뻔 FUN','34'),(34,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0','Sue','2022-04-07 22:12:21.675851','명언이죠','8d3d5fcb-8e53-4975-a6c6-cfbc5b524176.jpg',1,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0',0.8,'시작이 반이다','35'),(35,'0x146493adc84a15ac391d6d570a85adbbecfec19a','GT','2022-04-07 22:12:32.712954','멋 짐','035f051d-474d-472a-af02-0e34c009e817.JPG',1,'0x146493adc84a15ac391d6d570a85adbbecfec19a',0.7,'종준MAN','36'),(36,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0','Sue','2022-04-07 22:13:04.662754','나른한 오후에는 커피,,','df27a0da-e2c4-4bd3-8fc8-a6004023c06f.jpg',1,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0',1.2,'카페인 충전','38'),(37,'0x146493adc84a15ac391d6d570a85adbbecfec19a','GT','2022-04-07 22:13:04.912987','슬픈 것도 나쁘지 않아','4db118f5-1e60-477d-9da6-40cefa685ef3.JPG',0,'0x146493adc84a15ac391d6d570a85adbbecfec19a',0,'가끔은...','37'),(38,'0x146493adc84a15ac391d6d570a85adbbecfec19a','GT','2022-04-07 22:13:43.440398','쉬운 삶을 위해 기도하지 마라...','6c03868c-fbdd-4f6d-941d-9fb81b231ff8.JPG',1,'0x146493adc84a15ac391d6d570a85adbbecfec19a',0.04,'기도','39'),(39,'0x355170d0c1c654faa0d318f07394568c006fabdb','준','2022-04-07 22:13:45.551275','제 사인입니다. 탐나시죠?','8e5164c9-70c1-4e3c-8a0b-b1d8dfdc5906.png',1,'0x355170d0c1c654faa0d318f07394568c006fabdb',5,'June','40'),(40,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50','daye','2022-04-07 22:13:56.721256','풀꽃','82168d60-acad-4e95-830b-904a888b4360.jpg',0,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50',0,'풀꽃','41'),(41,'0x146493adc84a15ac391d6d570a85adbbecfec19a','GT','2022-04-07 22:14:17.680300','당신을 기다려요','cc7e12ae-2473-4307-9768-0306bac9563e.JPG',0,'0x146493adc84a15ac391d6d570a85adbbecfec19a',0,'당신','42'),(42,'0x146493adc84a15ac391d6d570a85adbbecfec19a','GT','2022-04-07 22:15:00.431369','춤추는 별','5741d050-a1d3-420b-a37a-7fe0f0d173e7.JPG',0,'0x146493adc84a15ac391d6d570a85adbbecfec19a',0,'별','43'),(43,'0x146493adc84a15ac391d6d570a85adbbecfec19a','GT','2022-04-07 22:15:25.409300','과거는','32e51042-186d-4bd1-b7ea-53939d184fed.JPG',0,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50',0,'잊어라','44'),(44,'0x355170d0c1c654faa0d318f07394568c006fabdb','준','2022-04-07 22:16:31.594924','친필 kallos','f43f3620-79bc-4d5c-9a46-1cd289d28427.png',1,'0x355170d0c1c654faa0d318f07394568c006fabdb',3,'Kallos','45'),(45,'0x355170d0c1c654faa0d318f07394568c006fabdb','준','2022-04-07 22:26:24.091183','저를 소개할게요.','baa7ff46-c1e3-4c6c-9db7-62c2995d7df4.png',1,'0x355170d0c1c654faa0d318f07394568c006fabdb',1.5,'소개','46'),(46,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b','naong','2022-04-07 22:33:59.409826','어때?','2697add7-8fc9-4920-a8b6-3992ffceea0f.png',1,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b',2,'와인 어때','47'),(47,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b','naong','2022-04-07 22:34:43.241997','캠핑 추천!','cde58b2b-2759-47ff-bb7f-49982e74785e.png',1,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b',3,'Campus','48'),(48,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b','naong','2022-04-07 22:39:45.526295','향기 솔솔','01567275-6ca6-4b20-98c2-e75e7d80cd57.png',1,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b',1,'퍼퓨미','49'),(49,'0x355170d0c1c654faa0d318f07394568c006fabdb','준','2022-04-07 22:44:51.308274','5팀 화이팅!','f810d64f-d13c-4683-ab8e-a1a830b81f0f.png',1,'0x355170d0c1c654faa0d318f07394568c006fabdb',5,'ChainTract','50'),(50,'0x355170d0c1c654faa0d318f07394568c006fabdb','준','2022-04-07 22:45:56.945512','4팀 화이팅!','d56dd415-0c4d-4882-b95d-47f8eb8b3e93.png',1,'0x355170d0c1c654faa0d318f07394568c006fabdb',4,'너와함께라면','51'),(51,'0x355170d0c1c654faa0d318f07394568c006fabdb','준','2022-04-07 23:42:04.392658','8팀 화이팅!','66289032-a347-4e7b-9dcd-2d75ecb02ee7.png',1,'0x355170d0c1c654faa0d318f07394568c006fabdb',8,'Muzi','52'),(52,'0x146493adc84a15ac391d6d570a85adbbecfec19a','GT','2022-04-07 23:42:19.201593','헌혈증~','4641ae17-3e25-4eba-b174-f8c150057b2f.png',1,'0x146493adc84a15ac391d6d570a85adbbecfec19a',6,'Blood Link','53'),(53,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50','daye','2022-04-07 23:55:24.758126','충전','9dc2044a-4f7f-44b1-9b00-e8fd59960827.jpg',1,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50',0.05,'충전','55');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'0xda9b2a2634f55d90ba97072eb56c94fc04bd5a50','안녕하세요','daye','0aef1fe9-780e-480a-9b73-b352185e6a58.png'),(2,'0xe00c8f1ef770aac11c4ca849034f03bb5dc208d0','일상 캘리그라피 작가 Sue입니다 :)','Sue','d6bcb39b-757c-4842-9de1-43ad3ef01ed3.jpg'),(3,'0x874c7b4a36d6c297242f4ff213aa7a00b2719a1b','반갑습니다 ㅎㅎ','naong','64c44c31-1179-40e6-9584-bf4491c91e94.jpg'),(4,'0x355170d0c1c654faa0d318f07394568c006fabdb','안녕하세요 준이에요','준','97c6ce95-0c40-4b1b-bebf-7e8c47f0199b.png'),(5,'0x146493adc84a15ac391d6d570a85adbbecfec19a','반갑습니다.','GT','990e08e4-a1cc-43fe-a41d-b12088ba52f8.png'),(6,'0xb08925ae2940d1be8bbf2cc9af8af9f51e120306',NULL,'나이키장인',NULL),(7,'0x1ecfd1c032dd2b5387349316c23ba9d00200972c',NULL,'dayeah',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08  1:17:21
