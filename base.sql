CREATE DATABASE IF NOT EXISTS questions CHARACTER SET utf8 COLLATE utf8_general_ci;
USE questions;
CREATE USER IF NOT EXISTS 'questions'@'%' IDENTIFIED BY '****';
GRANT ALL PRIVILEGES ON questions.* TO 'questions'@'%';
CREATE TABLE api_keys(
	ID int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	AppName varchar(255) NOT NULL UNIQUE,
    ApiKey varchar(255) NOT NULL,
    Blocked boolean DEFAULT 1,
    Admin boolean DEFAULT 0
);
INSERT INTO api_keys (AppName, ApiKey, Blocked, Admin) VALUES ("Main", "a2adfb9d-5f1b-49ae-a572-aaab53cb58ff", 0, 1);
