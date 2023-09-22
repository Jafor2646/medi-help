CREATE DATABASE  IF NOT EXISTS `medihelp`;
USE `medihelp`;

--
-- User profile start
--



DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` varchar(20) NOT NULL,
  `user_name`varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(128) NOT NULL,
  `address` varchar(128) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
   `user_type` varchar(15) NOT NULL,
  `picture` LONGBLOB DEFAULT NULL,
  
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



DROP TABLE IF EXISTS `following_table`;
CREATE TABLE `following_table` (
  `follow_id` int AUTO_INCREMENT NOT NULL,
  `follower_id` varchar(20) NOT NULL,
  `following_id`varchar(20) NOT NULL,
  
   PRIMARY KEY (`follow_id`),
   FOREIGN KEY (`follower_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY (`following_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `search_history`;
CREATE TABLE `search_history` (
  `search_id` int AUTO_INCREMENT NOT NULL,
  `searcher_id` varchar(20) NOT NULL,
  `search_text`varchar(128) NOT NULL,
  
   PRIMARY KEY (`search_id`),
   FOREIGN KEY (`searcher_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `thread_history`;
CREATE TABLE `thread_history` (
  `thread_id` int AUTO_INCREMENT NOT NULL,
  `uploader_id` varchar(20) NOT NULL,
  `thread_title` varchar(256) NOT NULL,
  `thread_body` varchar(60000) NOT NULL,
  `thread_date`  datetime NOT NULL,
  `thread_date_txt`  varchar(50) NOT NULL,
  `thread_view`  int default NULL,
  `thread_trend_view`  int default NULL,
  `thread_upvote`  int default NULL,
  `thread_downvote`  int default NULL,
  
   PRIMARY KEY (`thread_id`),
   FOREIGN KEY (`uploader_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE INDEX idx_thread_history ON thread_history(`thread_date`);

DROP TABLE IF EXISTS `thread_topic`;
CREATE TABLE `thread_topic` (
  `topic_id` int AUTO_INCREMENT NOT NULL,
  `uploader_id` varchar(20) NOT NULL,
  `thread_date_topic`  datetime NOT NULL,
  `thread_date_topic_txt`  varchar(50) NOT NULL,
  `topic_title` varchar(1000) NOT NULL,
  
   PRIMARY KEY (`topic_id`),
   FOREIGN KEY (`uploader_id`) REFERENCES `thread_history` (`uploader_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY (`thread_date_topic`) REFERENCES `thread_history` (`thread_date`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `thread_picture`;
CREATE TABLE `thread_picture` (
  `picture_id` int not null auto_increment,
  `uploader_id` varchar(20) NOT NULL,
  `thread_date`  datetime NOT NULL,
  `thread_date_txt`  varchar(50) NOT NULL,
  `thread_single_picture` LONGBLOB default NULL,
  
   primary key (`picture_id`),
   FOREIGN KEY (`uploader_id`) REFERENCES `thread_history` (`uploader_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY (`thread_date`) REFERENCES `thread_history` (`thread_date`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 default CHARSET=latin1;


DROP TABLE IF EXISTS `thread_comment`;
CREATE TABLE `thread_comment` (
  `comment_id` int AUTO_INCREMENT NOT NULL,
  `replier` varchar(20) NOT NULL,
  `thread_date` datetime NOT NULL,
  `thread_date_txt` varchar(50) NOT NULL,
  `comment_body` varchar(60000) NOT NULL,
  `comment_date` datetime NOT NULL,
  `comment_date_txt` varchar(50) NOT NULL,
  `comment_upvote`  int default NULL,
  `comment_downvote`  int default NULL,
  
   PRIMARY KEY (`comment_id`),
   FOREIGN KEY(`thread_date`) REFERENCES `thread_history` (`thread_date`) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY (`replier`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 default CHARSET=latin1;

CREATE INDEX idx_thread_comment ON thread_comment(`comment_date`);

DROP TABLE IF EXISTS `thread_comment_picture`;
CREATE TABLE `thread_comment_picture` (
  `picture_id` int not null auto_increment,
  `replier` varchar(20) NOT NULL,
  `thread_date` datetime NOT NULL,
  `thread_date_txt` varchar(50) NOT NULL,
  `comment_date`  datetime NOT NULL,
  `comment_date_txt`  varchar(50) NOT NULL,
  `thread_comment_single_picture` LONGBLOB default NULL,
  primary key (`picture_id`),
   FOREIGN KEY (`replier`) REFERENCES `thread_comment` (`replier`) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY(`thread_date`) REFERENCES `thread_history` (`thread_date`) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY (`comment_date`) REFERENCES `thread_comment` (`comment_date`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 default CHARSET=latin1;

--
-- User profile end
--


--
-- Doctor profile start
--
DROP TABLE IF EXISTS `doctor_extra_info`;
CREATE TABLE `doctor_extra_info` (
  `doctor_user_id` varchar(20) NOT NULL,
  `medical_registration_number`varchar(50) NOT NULL,
  `city` varchar(45) DEFAULT NULL,
  `verified` boolean DEFAULT null,
  `current_rating` decimal(5,1) default null,
  PRIMARY KEY (`doctor_user_id`),
  FOREIGN KEY (`doctor_user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `doctor_specialities`;
CREATE TABLE `doctor_specialities` (
  `speciality_id` int AUTO_INCREMENT NOT NULL,
  `doctor_id` varchar(20) NOT NULL,
  `speciality` varchar(1000) NOT NULL,
  
   PRIMARY KEY (`speciality_id`),
   FOREIGN KEY (`doctor_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
   
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `doctor_educational_qualification`;
CREATE TABLE `doctor_educational_qualification` (
  `doctor_id_auto` int not null auto_increment,
  `doctor_user_id` varchar(20) NOT NULL,
  `degree_title`varchar(100) NOT NULL,
  `institution`varchar(200) NOT NULL,
  `passing_year` int NOT NULL,
  
  PRIMARY KEY (`doctor_id_auto`)
) ENGINE=InnoDB auto_increment=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `doctor_professional_qualification`;
CREATE TABLE `doctor_professional_qualification` (
  `doctor_profession_id` int AUTO_INCREMENT NOT NULL,
  `currently_working_hospital_info_id` varchar(20) NOT NULL,
  `doctor_user_id` varchar(20) NOT NULL,
  `starting_year` int NOT NULL,
  `ending_year` int default NULL,
  
  PRIMARY KEY (`doctor_profession_id`),
  FOREIGN KEY (`doctor_user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`currently_working_hospital_info_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
  
) ENGINE=InnoDB auto_increment=1 DEFAULT CHARSET=latin1;



--
-- blog 
--
DROP TABLE IF EXISTS `blog_history`;
CREATE TABLE `blog_history` (
  `blog_id` int AUTO_INCREMENT NOT NULL,
  `uploader_id` varchar(20) NOT NULL,
  `blog_title` varchar(256) NOT NULL,
  `blog_body` varchar(60000) NOT NULL,
  `blog_date`  datetime NOT NULL,
  `blog_date_txt`  varchar(50) NOT NULL,
  `blog_view`  int default NULL,
  `blog_trend_view`  int default NULL,
  `blog_upvote`  int default NULL,
  `blog_downvote`  int default NULL,
  
   PRIMARY KEY (`blog_id`),
   FOREIGN KEY (`uploader_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE INDEX idx_blog_history ON blog_history(`blog_date`);

DROP TABLE IF EXISTS `blog_topic`;
CREATE TABLE `blog_topic` (
  `topic_id` int AUTO_INCREMENT NOT NULL,
  `uploader_id` varchar(20) NOT NULL,
  `blog_date_topic`  datetime NOT NULL,
  `blog_date_topic_txt`  varchar(50) NOT NULL,
  `topic_title` varchar(1000) NOT NULL,
  
   PRIMARY KEY (`topic_id`),
   FOREIGN KEY (`uploader_id`) REFERENCES `blog_history` (`uploader_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY (`blog_date_topic`) REFERENCES `blog_history` (`blog_date`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `blog_picture`;
CREATE TABLE `blog_picture` (
  `picture_id` int not null auto_increment,
  `uploader_id` varchar(20) NOT NULL,
  `blog_date`  datetime NOT NULL,
  `blog_date_txt`  varchar(50) NOT NULL,
  `blog_single_picture` LONGBLOB default NULL,
  
   primary key (`picture_id`),
   FOREIGN KEY (`uploader_id`) REFERENCES `blog_history` (`uploader_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY (`blog_date`) REFERENCES `blog_history` (`blog_date`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 default CHARSET=latin1;


DROP TABLE IF EXISTS `blog_comment`;
CREATE TABLE `blog_comment` (
  `blog_comment_id` int AUTO_INCREMENT NOT NULL,
  `replier` varchar(20) NOT NULL,
  `blog_date` datetime NOT NULL,
  `blog_date_txt` varchar(50) NULL,
  `comment_body` varchar(60000) NOT NULL,
  `comment_date` datetime NOT NULL,
  `comment_date_txt` varchar(50) NOT NULL,
  `comment_upvote`  int default NULL,
  `comment_downvote`  int default NULL,
  
   PRIMARY KEY (`blog_comment_id`),
   FOREIGN KEY (`blog_date`) REFERENCES `blog_history` (`blog_date`) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY (`replier`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 default CHARSET=latin1;

CREATE INDEX idx_blog_comment ON blog_comment(`comment_date`);

DROP TABLE IF EXISTS `blog_comment_picture`;
CREATE TABLE `blog_comment_picture` (
  `picture_id` int not null auto_increment,
  `replier` varchar(20) NOT NULL,
  `blog_date` datetime NOT NULL,
  `blog_date_txt` varchar(50) NOT NULL,
  `comment_date`  datetime NOT NULL,
  `comment_date_txt`  varchar(50) NOT NULL,
  `blog_comment_single_picture` LONGBLOB default NULL,
  primary key (`picture_id`),
   FOREIGN KEY (`replier`) REFERENCES `blog_comment` (`replier`) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY (`blog_date`) REFERENCES `blog_history` (`blog_date`) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY (`comment_date`) REFERENCES `blog_comment` (`comment_date`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 default CHARSET=latin1;

DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating` (
  `rating_id` int AUTO_INCREMENT NOT NULL,
  `rating_uploader` varchar(20) NOT NULL,
  `rating_getter`  varchar(20) NOT NULL,
  `rating_value` decimal(5,1) NOT NULL,
  `rating_time` datetime NOT NULL,
  `rating_time_txt` varchar(50) NOT NULL,
  `rating_text` varchar(512) default NULL,
  `rating_picture` LONGBLOB default NULL,
  primary key (`rating_id`),
   FOREIGN KEY (`rating_uploader`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY (`rating_getter`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 default CHARSET=latin1;

--
-- Doctor profile end
--

--
-- Hospital profile start
--

DROP TABLE IF EXISTS `hospital_extra_info`;
CREATE TABLE `hospital_extra_info` (
  `hospital_user_id` varchar(20) not null,
  `website` varchar(50) default NULL,
  `bio`varchar(256) default NULL,
  `status` varchar(15) default NULL,
  `governance_details` varchar(512) default null,
  PRIMARY KEY (`hospital_user_id`),
  FOREIGN KEY (`hospital_user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `hospital_equipment_list`;
CREATE TABLE `hospital_equipment_list` (
  `hospital_equipment_id` int AUTO_INCREMENT NOT NULL,
  `hospital_user_id` varchar(20) not null,
  `equipment_name` varchar(256) not null,
  `quantity` int NOT NULL,
  PRIMARY KEY (`hospital_equipment_id`),
  FOREIGN KEY (`hospital_user_id`) REFERENCES `hospital_extra_info` (`hospital_user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;