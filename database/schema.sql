CREATE DATABASE myPhotoArchive;

USE myPhotoArchive;

CREATE TABLE photos (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  tags VARCHAR(100) NOT NULL,
  src VARCHAR(25) NOT NULL,
  created DATE,
  clicks INT NOT NULL,
  downloads INT NOT NULL
)