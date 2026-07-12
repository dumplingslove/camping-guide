CREATE TABLE `visited_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`campgroundId` int NOT NULL,
	`startDate` varchar(20) NOT NULL,
	`endDate` varchar(20),
	`sites` varchar(100) NOT NULL DEFAULT '',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `visited_records_id` PRIMARY KEY(`id`)
);
