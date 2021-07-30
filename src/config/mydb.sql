create database proyectoNode;
use proyectoNode;

CREATE TABLE BOARDGAMES (
	ID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(80) NOT NULL,
    Publisher VARCHAR(60) NOT NULL,
    Category VARCHAR(2) NOT NULL,
	Description VARCHAR(200),
	Year VARCHAR(4),
    Favorites boolean,
    PRIMARY KEY(ID)
);

CREATE TABLE FAVORITES (
	ID INT NOT NULL AUTO_INCREMENT,
    IdBoardgame INT NOT NULL ,
    PRIMARY KEY (ID),
    FOREIGN KEY(IdBoardgame) REFERENCES BOARDGAMES (ID)
);