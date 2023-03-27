CREATE DATABASE IF NOT EXISTS api CHARACTER SET utf8 COLLATE utf8_general_ci;
USE api;
CREATE USER IF NOT EXISTS 'api'@'%' IDENTIFIED BY '****';
GRANT ALL PRIVILEGES ON api.* TO 'questions'@'%';

CREATE TABLE api_keys(
	ID int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	AppName varchar(255) NOT NULL UNIQUE,
    ApiKey varchar(255) NOT NULL,
    Blocked boolean DEFAULT 1,
    Admin boolean DEFAULT 0
);
INSERT INTO api_keys (AppName, ApiKey, Blocked, Admin) VALUES ("Main", "a2adfb9d-5f1b-49ae-a572-aaab53cb58ff", 0, 1);

CREATE TABLE permissions(
     ID int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      AppID int UNSIGNED NOT NULL,
       Perm varchar(255) NOT NULL 
);