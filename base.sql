CREATE TABLE `api_keys` (
  `ID` int(10) UNSIGNED NOT NULL,
  `AppName` varchar(255) NOT NULL,
  `ApiKey` varchar(255) NOT NULL,
  `Blocked` tinyint(1) DEFAULT 1,
  `Admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `api_keys` (`ID`, `AppName`, `ApiKey`, `Blocked`, `Admin`) VALUES
(1, 'Main', 'a2adfb9d-5f1b-49ae-a572-aaab53cb58ff', 0, 1),
(2, 'Test', 'b3a12094-e37b-4c74-b9d4-c1ff15a57dae', 1, 0);


CREATE TABLE `marks` (
  `ID` int(10) UNSIGNED NOT NULL,
  `PersonID` int(10) UNSIGNED NOT NULL,
  `Mark` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `marks` (`ID`, `PersonID`, `Mark`) VALUES
(1, 1, 2),
(2, 1, 4),
(3, 2, 3),
(4, 2, 5);

CREATE TABLE `permissions` (
  `ID` int(10) UNSIGNED NOT NULL,
  `AppID` int(10) UNSIGNED NOT NULL,
  `Perm` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `permissions` (`ID`, `AppID`, `Perm`) VALUES
(26, 1, 'static'),
(27, 1, 'random');

CREATE TABLE `person` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `person` (`ID`, `Name`) VALUES
(1, 'Márk'),
(2, 'Kevin');

ALTER TABLE `api_keys`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AppName` (`AppName`);

ALTER TABLE `marks`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `PersonID` (`PersonID`);

ALTER TABLE `permissions`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `person`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `api_keys`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `marks`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `permissions`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

ALTER TABLE `person`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `marks`
  ADD CONSTRAINT `marks_ibfk_1` FOREIGN KEY (`PersonID`) REFERENCES `person` (`ID`) ON DELETE CASCADE;
COMMIT;