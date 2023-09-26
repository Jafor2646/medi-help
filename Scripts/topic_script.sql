USE `medihelp`;

DROP TABLE IF EXISTS `topic_table`;
CREATE TABLE `topic_table` (
	`topic_id` int not null auto_increment,
  `topic_name` varchar(128),
  PRIMARY KEY (`topic_id`)
) ENGINE=InnoDB auto_increment=1 DEFAULT CHARSET=latin1;


INSERT INTO `topic_table` (`topic_name`) VALUES 
('Ophthalmology'),
('Pediatrics'),
('Plastic Surgery'),
('Orthopedic Surgery'),
('Neonatology'),
('Nephrology'),
('Rheumatology'),
('Oncology'),
('Physical Medicine and Rehabilitation'),
('Psychiatry'),
('General Surgery'),
('Pathology'),
('Cardiology'),
('Dermatology'),
('Gastroenterology'),
('Endocrinology'),
('Geriatrics'),
('Obstetrics and Gynecology'),
('Medical Genetics'),
('Otolaryngology (ENT)'),
('Hematology'),
('Pulmonology'),
('Radiology'),
('Infectious Disease'),
('Family Medicine'),
('Emergency Medicine'),
('Urology'),
('Internal Medicine'),
('Neurology');