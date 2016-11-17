CREATE TABLE webshop (
	name VARCHAR(50),
    bankAccountNumber VARCHAR(50),
    address VARCHAR(50),
    phone VARCHAR(50),
    email VARCHAR(50),
    url VARCHAR(50) NOT NULL,
    PRIMARY KEY (url)
);

CREATE TABLE product (
	name VARCHAR(50),
    price INT(11),
    description VARCHAR(300),
    pictureUrl VARCHAR(50),
    productID INT(11) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (productID)
);

CREATE TABLE sells (
	productID INT(11) NOT NULL REFERENCES product(productID),
    webshopID VARCHAR(50) NOT NULL REFERENCES webshop(url),
    quantity INT(11),
    PRIMARY KEY (productID, webshopID)
);

CREATE TABLE role (
	name VARCHAR(50) NOT NULL,
    roleID INT(11) NOT NULL,
    PRIMARY KEY (roleID)
);

CREATE TABLE user (
	fullname VARCHAR(50),
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50),
    phone VARCHAR(50),
    roleID INT(11) NOT NULL REFERENCES role(roleID),
    webshopID VARCHAR(50) REFERENCES webshop(url),
    userID INT(11) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (userID)
);

CREATE TABLE status (
	name VARCHAR(50) NOT NULL,
    statusID INT(11) NOT NULL,
    PRIMARY KEY (statusID)
);

CREATE TABLE buy (
	buyerID INT(11) NOT NULL REFERENCES user(userID),
    webshopID VARCHAR(50) NOT NULL REFERENCES webshop(url),
    productID INT(11) NOT NULL REFERENCES product(productID),
    statusID INT(11) NOT NULL REFERENCES status(statusID),
    quantity INT(11) NOT NULL,
    datetime DATETIME NOT NULL,
    transID INT(11) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (transID)
);

/* The DATETIME type is used for values that contain both date and time parts. MySQL retrieves and displays DATETIME values in 'YYYY-MM-DD HH:MM:SS' format. The supported range is '1000-01-01 00:00:00' to '9999-12-31 23:59:59'.*/
    