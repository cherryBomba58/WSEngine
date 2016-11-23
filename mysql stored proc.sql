CREATE DEFINER=`root`@`localhost` PROCEDURE `order_cart`(IN userID INT)
BEGIN
  DECLARE done INTEGER DEFAULT FALSE;
  DECLARE product, bought_quantity, all_quantity INT(11);
  DECLARE webshop VARCHAR(50);
  DECLARE bought_quan_too_big CONDITION FOR SQLSTATE '22012';
  DECLARE cur CURSOR FOR SELECT productID, webshopID, quantity FROM buy WHERE statusID = 1 AND buyerID = userID;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

  OPEN cur;

  read_loop: LOOP
    FETCH cur INTO product, webshop, bought_quantity;
    IF done THEN
      LEAVE read_loop;
    END IF;
    
    SELECT quantity INTO all_quantity FROM sells WHERE productID = product AND webshopID = webshop;
    
    IF bought_quantity > all_quantity THEN
      SIGNAL bought_quan_too_big;
	ELSE
	  UPDATE sells SET quantity = all_quantity - bought_quantity WHERE productID = product AND webshopID = webshop;
      UPDATE buy SET statusID = 2 WHERE statusID = 1 AND buyerID = userID;
    END IF;
  END LOOP;

  CLOSE cur;
END