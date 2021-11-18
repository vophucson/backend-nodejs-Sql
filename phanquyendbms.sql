

/* Tạo các role*/

/* tao login cho nologin role */
CREATE LOGIN [nologinconnection]

WITH PASSWORD = 'nologin',

CHECK_POLICY = OFF, CHECK_EXPIRATION = OFF,

DEFAULT_DATABASE = shopdb;
CREATE USER [nologinconnection]
FOR LOGIN [nologinconnection];
/* add user cho nologin role */
exec sp_addrolemember nologinrole,'nologinconnection'
/* role nologin */
exec sp_addrole nologinrole
GRANT select on banner to nologinrole
GRANT select on categories to nologinrole
GRANT select on products to nologinrole
GRANT select on review to nologinrole
GRANT select on viewallproduct to nologinrole
GRANT exec on getproductid to nologinrole
GRANT exec on getproductdetail to nologinrole
GRANT exec on searchproduct to nologinrole
GRANT select on viewcomment to nologinrole
GRANT exec on getpassword to nologinrole
GRANT exec on getpasswordadmin to nologinrole
/* role userrole */
exec sp_addrole userrole
GRANT select on categories to userrole
GRANT select on banner to userrole
GRANT select on products to userrole
GRANT select on Ship to userrole
GRANT select,update,delete,insert on orders to userrole
GRANT select,update,insert on review to userrole
GRANT select,update on registration to userrole
GRANT exec ON dbo.tongtien to userrole
GRANT exec ON checkupdate to userrole
GRANT exec ON addtocart to userrole
GRANT select on cartview to userrole
GRANT exec ON updateship to userrole
GRANT exec ON checkout to userrole
GRANT exec ON deletecart to userrole
GRANT exec ON orderhistory to userrole
GRANT select on orderhistorydetail to userrole
GRANT exec on  sendreview to userrole
GRANT exec ON shipperoder to userrole
GRANT exec ON shipperoderdetail to userrole
GRANT exec ON pickuporder to userrole
GRANT exec ON finishorder to userrole
GRANT exec ON cancelorder to userrole
GRANT exec ON getuserbyid to userrole
GRANT exec ON edituser to userrole
GRANT  exec on dangnhap to userrole
/* role admin */
exec sp_addrole adminrole
GRANT select,update,delete,insert on banner to adminrole
GRANT exec ON createbanner to adminrole
GRANT exec ON deletebanner to adminrole
GRANT exec ON updatebanner to adminrole
GRANT select,update,delete,insert on categories to adminrole
GRANT exec ON createcategory to adminrole
GRANT exec ON deletecategory to adminrole
GRANT exec ON updatecategory to adminrole
GRANT select,update,delete,insert on products to adminrole
GRANT exec ON createproduct to adminrole
GRANT select on  searchcategoryId to userrole
GRANT exec ON updateproduct to adminrole
GRANT exec ON deleteproduct to adminrole
GRANT select,update,delete on registration to adminrole
GRANT select,update,insert,delete on Ship to adminrole
GRANT select,update,delete on orders to adminrole
GRANT select on viewxl  to adminrole
GRANT select on viewgh  to adminrole
GRANT select on viewnh  to adminrole
GRANT select on viewhuy to adminrole
GRANT exec on shiporder to adminrole
GRANT exec on deleteorder to adminrole
GRANT select on searchcategoryId to adminrole
GRANT select on viewshipper  to adminrole
GRANT exec on createshipservice to adminrole
GRANT exec on deleteshipservice to adminrole	
GRANT exec on updateshipservice to adminrole
GRANT select,update on storehouse  to adminrole
GRANT exec on checkquantity to adminrole
GRANT exec on updatequantity to adminrole
GRANT exec on setrole to adminrole
GRANT exec on deleteuser to adminrole
GRANT select on searchuser to adminrole
GRANT select on viewuser to adminrole
GRANT select on viewadmin to adminrole
GRANT  exec on dangnhapadmin to adminrole
