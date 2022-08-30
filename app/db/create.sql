DROP DATABASE IF EXISTS movie;
CREATE DATABASE	movie;

USE movie;
DROP TABLE IF EXISTS movie;
CREATE TABLE movie (
id varchar(100) NOT NULL UNIQUE,
title varchar(100) NOT NULL UNIQUE,
original_title varchar(100) NOT NULL,
original_title_romanised varchar(100) NOT NULL,
image varchar(255) NOT NULL,
movie_banner varchar(255) NOT NULL,
`description` text NOT NULL,
director varchar(100) NOT NULL,
producer varchar(100) NOT NULL,
release_date varchar(4) NOT NULL,
running_time varchar(3) NOT NULL,
rt_score varchar(3) NOT NULL,
url varchar(255) NOT NULL,
small_id int NOT NULL AUTO_INCREMENT UNIQUE,
CONSTRAINT PRIMARY KEY (id, small_id)
);