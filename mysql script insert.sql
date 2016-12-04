INSERT INTO role(name, roleID)
VALUES('global_admin', 1), ('webshop_admin', 2), ('buyer', 3);

INSERT INTO user(fullname, username, password, email, phone, roleID, webshopID)
VALUES('Great Administrator', 'admin', '88611d81ad92520ec74e1f6cf95ccdd9', 'admin@wsengine.hu', '06 1 111 1111', 1, null);

INSERT INTO status(name, statusID)
VALUES('in cart', 1), ('ordered', 2);