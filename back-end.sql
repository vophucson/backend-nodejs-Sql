/****** Script for SelectTopNRows command from SSMS  ******/
/** dangky **/
CREATE procedure [dbo].[dangky]  
(
@Id int,
@username nvarchar(50),
@password nvarchar(100),
@phone nvarchar(50),
@email nvarchar(50),
@address nvarchar(50)
)  
AS  
BEGIN
declare @sql nvarchar(max)
set @sql = 'CREATE LOGIN ['+@email+']

WITH PASSWORD = '''+@password+''',

CHECK_POLICY = ON, CHECK_EXPIRATION = OFF,

DEFAULT_DATABASE = shopdb;
CREATE USER ['+@email+']
FOR LOGIN ['+@email+'];
exec sp_addrolemember userrole,['+@email+'];'
EXEC(@sql);
insert into registration(Id,username,password,phone,email,role,address) values(@Id,@username, @password, @phone, @email,'user',@address)
END
EXEC dangky  23,'sơn võ','123123','09193512808','sonvo1000@gmail.com','quan 10'
/* kiểm tra password */
CREATE procedure [dbo].[getpassword]  
(
@email nvarchar(50)
)  
AS  
BEGIN
SELECT password from registration where email = @email 
END
drop proc getpassword
/** check trung dang ky**/


CREATE procedure [dbo].[dangkyuseremail]  
(
@email nvarchar(50)
)  
AS  
BEGIN
SELECT username from registration where email = @email
END
DROP procedure dangkyuseremail
EXEC dangkyuseremail 'vophucson112@gmail.com'

CREATE procedure [dbo].[dangkyuserphone]  
(
@phone nvarchar(50)
)  
AS  
BEGIN
SELECT username from registration where phone = @phone
END
EXEC dangkyuserphone '036897522321'

/** dang nhap **/
drop proc dangnhap
CREATE procedure [dbo].[dangnhap]  
(
@email nvarchar(50)
)  
AS  
BEGIN
SELECT * from registration where email = @email and (role = 'user' or role = 'shipper')
END
EXEC dangnhap 'sonvo@gmail.com'
CREATE procedure [dbo].[dangnhapadmin]  
(
@email nvarchar(50)
)  
AS  
BEGIN
SELECT * from registration where email = @email and role = 'admin'
END
EXEC dangnhapadmin 'vophucson11@gmail.com'
/**api category **/
select * from categories
/** api products **/
CREATE VIEW viewallproduct
AS
select productId,productName,categoryName,description,productPrice,imageUrl,categoryImage
from products inner join categories on products.categoryId = categories.categoryId
select * from viewallproduct

drop proc allproduct
CREATE procedure [dbo].[getproductid]  
(
@categoryId varchar(64)
)  
AS  
BEGIN
select productId,productName,categoryName,description,productPrice,imageUrl
from products inner join categories on products.categoryId = categories.categoryId 
where categories.categoryId = @categoryId
END
EXEC getproductid '2'
CREATE procedure [dbo].[getproductdetail]  
(
@productId varchar(64)
)  
AS  
BEGIN
select productId,productName,categoryName,description,productPrice,imageUrl
from products inner join categories on products.categoryId = categories.categoryId 
where productId = @productId
END
EXEC getproductdetail 2
CREATE procedure [dbo].[searchproduct]  
(
@productName nvarchar(64)
)  
AS  
BEGIN
select productId,productName,categoryName,description,productPrice,imageUrl
from products inner join categories on products.categoryId = categories.categoryId 
where productName Like @productName
END
EXEC searchproduct '%t%'
/** api user **/
CREATE procedure [dbo].[getuserbyid]  
(
@Id Int
)  
AS  
BEGIN
select Id,userName, phone ,email,address,userimage from registration where Id =@Id
END
EXEC getuserbyid 5
update registration set username ='sonvo33' where Id = 5
/** checkupdate**/
CREATE FUNCTION checkupdate(@RegisID int, @phone nvarchar(50))
RETURNS int 
AS
BEGIN
	DECLARE @result int
	IF(@phone = (SELECT phone FROM registration WHERE Id = @RegisID))
		SET @result = 1
	ELSE
	BEGIN
	IF((SELECT COUNT(Id) FROM registration WHERE phone = @phone) = 0)
		SET @result = 2
	ELSE
		SET @result = 0
	END
	RETURN @result
END
GO
CREATE procedure [dbo].[edituser]  
(
@username nvarchar(50),
@phone nvarchar(50),
@address nvarchar(50),
@userimage text,
@Id int
)  
AS  
BEGIN
update registration set username = @username,phone = @phone,address = @address,userimage =@userimage where Id = @Id
END
DROP procedure edituser
CREATE procedure [dbo].[getpasswordbyid]  
(
@Id Int
)  
AS  
BEGIN
select password from registration where Id =@Id
END
EXEC getpasswordbyid 2
CREATE procedure [dbo].[changepassword]  
(
@Id Int,
@password nvarchar(100)
)  
AS  
BEGIN
declare @email nvarchar(50)
declare @sql nvarchar(max)
set @email = (select email from registration where Id = @Id)
set @sql = 'ALTER LOGIN ['+@email+'] WITH PASSWORD = '''+@password+''''
EXEC(@sql);
update registration set password = @password where Id = @Id
END
drop proc changepassword
EXEC changepassword 1,'123'
/** api dat hang **/
CREATE FUNCTION tongtien(
    @productId INT,
    @quantity INT
)
RETURNS INT
AS
BEGIN
	DECLARE @price Int;
	SELECT @price = productPrice from products where productId = @productId
    RETURN (@price * @quantity);
END
drop function tongtien
select dbo.tongtien(1,2,0) as total
CREATE procedure [dbo].[addtocart]  
(
@orderId varchar(64),
@userId Int,
@totalPrice Int,
@orderDate Date,
@productId Int,
@productSize decimal(3,1),
@quantity Int
)  
AS  
BEGIN
insert into orders(orderId,userId,totalPrice,orderDate,status,productId,productSize,quantity) values (@orderId,@userId,@totalPrice,@orderDate,N'Chưa thanh toán',@productId,@productSize,@quantity)
END
EXEC addtocart 6,1,1,'2021-7-8',1,36.5,1
DROP procedure addtocard
select productPrice from products where productId = 1


CREATE FUNCTION cartview(
    @userId INT
)
RETURNS TABLE
AS
	RETURN SELECT productName,imageUrl,orderId,totalPrice,productSize,quantity,
		FROM products inner join orders on products.productId = orders.productId
	WHERE userId = @userId and status =N'Chưa thanh toán' 

DROP function cartview
SELECT * FROM dbo.cartview(2)
CREATE procedure [dbo].[updateship]  
(
@orderId varchar(64),
@Id Int
)  
AS  
BEGIN
UPDATE orders set ShipId = @Id Where orderId = @orderId
SELECT shipName,shipDay,ShipPrice
FROM Ship inner join orders on Ship.Id = orders.ShipId
WHERE orderId = @orderId
END
DROP procedure updateship
EXEC updateship 'MaDH1_1625559614722',2
CREATE procedure [dbo].[checkout]  
(
@orderId varchar(64),
@expireDate Date,
@shipPrice Int
)  
AS  
BEGIN
UPDATE orders set status = N'Đang xử lý',expireDate = @expireDate,totalPrice = totalPrice + @shipPrice where orderId = @orderId
END

EXEC checkout 'MaDH1_1625559499490','2021-7-11',1000
CREATE procedure [dbo].[deletecart]  
(
@orderId varchar(64)
)  
AS  
BEGIN
delete from orders where orderId = @orderId
END
drop procedure deletecart
/** api reivew **/
CREATE procedure [dbo].[sendreview]  
(
@reviewId varchar(64),
@productId Int,
@star Int,
@userId Int,
@comment ntext,
@dayComment date

)  
AS  
BEGIN
insert into review(reviewId,productId,star,userId,comment,dayComment) values(@reviewId,@productId,@star,@userId,@comment,@dayComment)
END
drop procedure sendreview
EXEC sendreview 12,1,1,1,'có gì đâu','2021/1/1'
DROP FUNCTION viewcomment
CREATE FUNCTION viewcomment(
    @productId INT
)
RETURNS TABLE
AS
	RETURN SELECT productId,reviewId,username,userimage,star,comment,CONVERT(varchar(20),dayComment,103) as dayComment
			FROM review inner join registration on review.userId = registration.Id
			WHERE productId = @productId
select * from viewcomment(1) order by dayComment DESC
drop function viewcomment
/** api admin ########################**/
/** api category **/
drop proc deltecategory
CREATE procedure [dbo].[createcategory]  
(
@categoryId Int,
@categoryName varchar(64),
@categoryImage text
)  
AS  
BEGIN
insert into categories(categoryId,categoryName,categoryImage) values(@categoryId,@categoryName,@categoryImage)
END

EXEC taocategory 7,'asdasdzxc','https:/xc'
drop proc taocategory
select MAX(categoryId) as id from categories

delete from categories where categoryId = 6
CREATE procedure [dbo].[deletecategory]  
(
@categoryId Int

)  
AS  
BEGIN
delete from categories where categoryId = @categoryId
END
drop proc deltecategory
exec deltecategory 6
CREATE procedure [dbo].[updatecategory]  
(
@categoryId Int,
@categoryName varchar(64),
@categoryImage text
)  
AS  
BEGIN
UPDATE categories set categoryName = @categoryName,categoryImage = @categoryImage where categoryId = @categoryId
END
EXEC updatecategory 5,'asdasd','cxcxc'
/** api product **/
CREATE procedure [dbo].[createproduct]  
(
@productId Int,
@productName nvarchar(64),
@categoryId Int,
@productPrice Int,
@imageUrl text,
@description ntext
)  
AS  
BEGIN
insert into products(productId,productName,categoryId,productPrice,imageUrl,description) values (@productId,@productName,@categoryId,@productPrice,@imageUrl,@description)
END
EXEC createproduct 10,'asdasd',1,100,'asdasd','asdasd'


select categoryId from categories where categoryName = 'Nike'

CREATE FUNCTION searchcategoryId(
    @categoryName varchar(64)
)
RETURNS TABLE
AS
	RETURN select categoryId from categories where categoryName = @categoryName

select * from searchcategoryId('Nike')
CREATE procedure [dbo].[updateproduct]  
(
@productId Int,
@productName nvarchar(64),
@categoryId Int,
@productPrice Int,
@imageUrl text,
@description ntext
)  
AS  
BEGIN
UPDATE products set productName = @productName,categoryId = @categoryId,productPrice = @productPrice,imageUrl = @imageUrl,description = @description where productId = @productId
END

EXEC updateproduct 6,'haha',1,100,'https','asdasd'
CREATE procedure [dbo].[deleteproduct]  
(
@productId Int

)  
AS  
BEGIN
delete from products where productId = @productId
END
EXEC deleteproduct 7
/** api user **/
select * from registration

CREATE procedure [dbo].[setrole]  
(
@Id Int,
@role nvarchar(50)
)  
AS  
BEGIN
declare @oldrole nvarchar(50)
declare @email  nvarchar(50)
set @email = (select email from registration where Id = @Id)
set @oldrole = (select role from registration where Id = @Id)
IF @oldrole != @role
BEGIN
	IF @oldrole = 'admin' and (@role = 'user' or @role = 'shipper')
	BEGIN
	exec sp_droprolemember adminrole,@email
	exec sp_addrolemember userrole,@email
	END
	ELSE
	BEGIN
		IF (@oldrole = 'user' or @oldrole = 'shipper') and @role = 'admin'
		exec sp_droprolemember userrole,@email
		exec  sp_addrolemember adminrole,@email
	END
END
UPDATE registration set role = @role where Id = @Id
END
drop proc setrole
EXEC setrole 1,'admin'
CREATE procedure [dbo].[deleteuser]  
(
@Id Int

)  
AS  
BEGIN
delete from registration where Id = @Id
END
EXEC deleteuser 5
CREATE FUNCTION searchuser(
	@username nvarchar(50)
)
RETURNS TABLE
AS
	RETURN SELECT *
			FROM registration
			WHERE username Like @username

SELECT * from searchuser('%võ%')
SELECT * from orders where status = N'Đang xử lý'
SELECT * from orders where status = N'Đang giao hàng'
SELECT * from orders where status = N'Đã nhận hàng'
SELECT * from orders where status = N'Hủy đơn hàng'
/** api order **//
drop view dbo.viewxl
CREATE VIEW viewxl 
as
SELECT orderId,username,address,phone,CONVERT(varchar(20),orderDate,103) as orderDate,CONVERT(varchar(20),expireDate,103) as expireDate,totalPrice,productName,imageUrl,productSize,quantity,productPrice,shipName,ShipPrice,shipDay
from orders,Ship,registration,products where orders.ShipId = Ship.Id  and orders.userId = registration.Id and orders.productId = products.productId and status = N'Đang xử lý'  
SELECT * FROM dbo.viewxl
drop view viewgh
CREATE VIEW viewgh 
as
SELECT orderId,status,registration.username as username,registration.address as address,registration.phone as phone,CONVERT(varchar(20),orderDate,103) as orderDate,CONVERT(varchar(20),expireDate,103) as expireDate,totalPrice,productName,imageUrl,productSize,quantity,productPrice,shipName,ShipPrice,shipDay,shipper.username as shipperName,shipper.phone as shipperPhone
from orders,Ship,registration,products,registration as shipper where orders.ShipId = Ship.Id  and orders.userId = registration.Id and orders.productId = products.productId  and orders.shipperId = shipper.Id  and (status = N'Đang giao hàng' or status = N'Nhân viên đã lấy hàng và đang đi giao')
drop view viewhuy
CREATE VIEW viewnh
as
SELECT orderId,status,registration.username as username,registration.address as address,registration.phone as phone,CONVERT(varchar(20),orderDate,103) as orderDate,CONVERT(varchar(20),expireDate,103) as expireDate,totalPrice,productName,imageUrl,productSize,quantity,productPrice,shipName,ShipPrice,shipDay,shipper.username as shipperName,shipper.phone as shipperPhone
from orders,Ship,registration,products,registration as shipper where orders.ShipId = Ship.Id  and orders.userId = registration.Id and orders.productId = products.productId  and orders.shipperId = shipper.Id  and status = N'Đã nhận hàng'

CREATE VIEW viewhuy
as
SELECT orderId,status,registration.username as username,registration.address as address,registration.phone as phone,CONVERT(varchar(20),orderDate,103) as orderDate,CONVERT(varchar(20),expireDate,103) as expireDate,totalPrice,productName,imageUrl,productSize,quantity,productPrice,shipName,ShipPrice,shipDay,shipper.username as shipperName,shipper.phone as shipperPhone
from orders,Ship,registration,products,registration as shipper where orders.ShipId = Ship.Id  and orders.userId = registration.Id and orders.productId = products.productId  and orders.shipperId = shipper.Id  and status = N'Hủy đơn hàng'
CREATE procedure [dbo].[shiporder]  
(
@shipperId Int,
@orderId varchar(64)
) 
AS  
BEGIN
UPDATE orders set status = N'Đang giao hàng',shipperId = @shipperId where orderId = @orderId
END
EXEC shiporder 1,'MaDH2_1625577856022'
select * from viewhuy
CREATE FUNCTION orderhistorydetail (
		@orderId varchar(64) )
RETURNS @detail TABLE (orderId varchar(64),productName nvarchar(64),productPrice int,imageUrl text,orderDate varchar(20),expireDate varchar(20),quantity INT,totalPrice INT,status nvarchar(50),productSize decimal(3, 1),shipNane nvarchar(50),shipperName nvarchar(50),phoneShipper nvarchar(50),shipPrice INT,shipAddress nvarchar(50))
AS
BEGIN
DECLARE @Ship INT
DECLARE @ID varchar(64)
DECLARE @shipId INT
DECLARE @shipperId INT
DECLARE @productName nvarchar(64)
DECLARE @productPrice INT
DECLARE @imageUrl varchar(MAX)
DECLARE @orderDate varchar(20)
DECLARE @expireDate varchar(20)
DECLARE @quantity INT
DECLARE @totalPrice INT
DECLARE @status nvarchar(50)
DECLARE @productSize decimal (3,1)
DECLARE @shipName nvarchar(50)
DECLARE @shipperName nvarchar(50)
DECLARE @phoneShipper nvarchar(50)
DECLARE @shipPrice INT
DECLARE @shipAddress nvarchar(50)
SELECT @Ship = ShipId FROM orders where orderId = @orderId
SELECT @shipperId = shipperId FROM orders where orderId = @orderId
	IF @Ship IS NULL
	BEGIN
		SELECT @ID = orderId,@productName = productName,@productPrice = productPrice,@imageUrl = imageUrl,@orderDate =CONVERT(varchar(20),orderDate,103),@quantity =quantity,@totalPrice =totalPrice,@status =status,@productSize =productSize,@shipAddress = address
		from orders,products,registration where orders.productId = products.productId and orderId = @orderId and registration.Id = orders.userId
		INSERT INTO @detail VALUES (@ID,@productName,@productPrice,@imageUrl,@orderDate,NULL,@quantity,@totalPrice,@status,@productSize,NULL,NULL,NULL,NULL,@shipAddress)
	END
	ELSE 
	BEGIN
		IF @shipperId IS NULL
		BEGIN
			SELECT @ID = orderId,@productName = productName,@productPrice = productPrice,@imageUrl = imageUrl,@orderDate =CONVERT(varchar(20),orderDate,103),@quantity =quantity,@totalPrice =totalPrice,@status =status,@productSize =productSize,@expireDate =CONVERT(varchar(20),expireDate,103),@shipName = shipName,@shipPrice =ShipPrice,@shipAddress = address
			from orders,products,Ship,registration where orders.productId = products.productId and orderId = @orderId and orders.ShipId =Ship.Id and registration.Id = orders.userId
				INSERT INTO @detail VALUES (@ID,@productName,@productPrice,@imageUrl,@orderDate,@expireDate,@quantity,@totalPrice,@status,@productSize,@shipName,NULL,NULL,@shipPrice,@shipAddress)
		END
		ELSE
		BEGIN
			SELECT @ID = orderId,@productName = productName,@productPrice = productPrice,@imageUrl = imageUrl,@orderDate =CONVERT(varchar(20),orderDate,103),@quantity =quantity,@totalPrice =totalPrice,@status =status,@productSize =productSize,@expireDate =CONVERT(varchar(20),expireDate,103),@shipName = shipName,@shipPrice =ShipPrice,@shipperName =registration.username,@phoneShipper =registration.phone,@shipAddress = userInfo.address
			from orders,products,Ship,registration,registration as userInfo where orders.productId = products.productId and orderId = @orderId and orders.ShipId =Ship.Id and orders.shipperId = registration.Id and orders.userId = userInfo.Id
			INSERT INTO @detail VALUES (@ID,@productName,@productPrice,@imageUrl,@orderDate,@expireDate,@quantity,@totalPrice,@status,@productSize,@shipName,@shipperName,@phoneShipper,@shipPrice,@shipAddress)
		END
	END
RETURN 
END
SELECT ShipId FROM orders where orderId = 'MaDH2_1628843768977'
select * from orderhistorydetail('MaDH2_1628854075441')
DROP FUNCTION orderhistorydetail
CREATE procedure [dbo].[orderhistory]  
(
@userId Int

)  
AS  
BEGIN
select orderId,productName,productPrice,imageUrl,totalPrice,status,productSize,quantity,CONVERT(varchar(20),orderDate,103) as orderDate
from orders,products
where orders.productId = products.productId and userId = @userId
END
drop procedure orderhistory
EXEC orderhistory 2
/** api shipper **/
drop proc getallshipper
CREATE VIEW viewshipper
as 
select * from registration where role = 'shipper'
CREATE VIEW viewuser
as 
select * from registration where role = 'user'
CREATE VIEW viewadmin
as 
select * from registration where role = 'admin'

CREATE procedure [dbo].[shipperoder]  
(
@shipperId Int

)  
AS  
BEGIN
select orderId,totalPrice,username,address,phone,userimage ,CONVERT(varchar(20),orderDate,103) as orderDate,CONVERT(varchar(20),expireDate,103) as expireDate
from orders,products,registration
where orders.productId = products.productId and orders.userId = registration.Id and shipperId = @shipperId and (status = N'Nhân viên đã lấy hàng và đang đi giao' or status = N'Đang giao hàng')
END
exec shipperoder 3
drop proc shipperoder
CREATE procedure [dbo].[shipperoderdetail]  
(
@orderId varchar(64)

)  
AS  
BEGIN
select orderId,productName,imageUrl,productPrice,totalPrice,quantity,username,address,phone,CONVERT(varchar(20),orderDate,103) as orderDate,CONVERT(varchar(20),expireDate,103) as expireDate,shipName,ShipPrice
from orders,registration,products,Ship
where orders.userId = registration.Id and orders.productId = products.productId and orders.ShipId = Ship.Id and orderId = @orderId
END
drop procedure shipperoderdetail
exec shipperoderdetail 'MaDH2_1625577818931'

CREATE procedure [dbo].[pickuporder]  
(
@orderId varchar(64)

)  
AS  
BEGIN
update orders set status = N'Nhân viên đã lấy hàng và đang đi giao' where orderId = @orderId
END
drop procedure pickuporder
CREATE procedure [dbo].[finishorder]  
(
@orderId varchar(64)

)  
AS  
BEGIN
update orders set status = N'Đã nhận hàng' where orderId = @orderId
END
CREATE procedure [dbo].[cancelorder]  
(
@orderId varchar(64)

)  
AS  
BEGIN
update orders set status = N'Hủy đơn hàng' where orderId = @orderId
END
/** xóa order **/
	CREATE procedure [dbo].[deleteorder]  
	(
	@orderId varchar(64)

	)  
	AS  
	BEGIN
	delete orders where orderId = @orderId
	END
execute deleteorder 'OD123'
/** storehouse **/
CREATE TRIGGER updatestorehouse ON products after INSERT AS
BEGIN
DECLARE @Id int;
SELECT @Id = productId
from inserted
insert into storehouse(productId,productSize,quantity) values (@Id,36,0)
insert into storehouse(productId,productSize,quantity) values (@Id,36.5,0)
insert into storehouse(productId,productSize,quantity) values (@Id,37,0)
insert into storehouse(productId,productSize,quantity) values (@Id,37.5,0)
insert into storehouse(productId,productSize,quantity) values (@Id,38,0)
insert into storehouse(productId,productSize,quantity) values (@Id,38.5,0)
insert into storehouse(productId,productSize,quantity) values (@Id,39,0)
insert into storehouse(productId,productSize,quantity) values (@Id,39.5,0)
insert into storehouse(productId,productSize,quantity) values (@Id,40,0)
insert into storehouse(productId,productSize,quantity) values (@Id,40.5,0)
insert into storehouse(productId,productSize,quantity) values (@Id,41,0)
insert into storehouse(productId,productSize,quantity) values (@Id,41.5,0)
insert into storehouse(productId,productSize,quantity) values (@Id,42,0)
insert into storehouse(productId,productSize,quantity) values (@Id,42.5,0)
insert into storehouse(productId,productSize,quantity) values (@Id,43,0)
END
drop trigger updatestorehouse

CREATE TRIGGER pickup ON orders after UPDATE AS
BEGIN
DECLARE @newstatus nvarchar(50)
SELECT @newstatus = status
from inserted 
DECLARE @oldstatus nvarchar(50)
SELECT @oldstatus = status
from deleted 
IF  @newstatus = N'Nhân viên đã lấy hàng và đang đi giao'
BEGIN
IF @oldstatus = N'Nhân viên đã lấy hàng và đang đi giao' 
BEGIN
ROLLBACK TRAN;
END
ELSE
BEGIN
DECLARE @orderquantity int,@productId int,@productsize decimal(3,1)
SELECT @productsize =  productSize ,@productId = productId,@orderquantity = quantity   from inserted
UPDATE storehouse set quantity = quantity - @orderquantity where productId = @productId and productSize = @productsize
END
END
END

DROP TRIGGER pickup
CREATE TRIGGER cancel ON orders after UPDATE AS
BEGIN
DECLARE @Id varchar(64)
SELECT @Id = orderId
from inserted where status = N'Hủy đơn hàng'
IF  @Id IS NOT NULL
BEGIN
DECLARE @orderquantity int,@productId int,@productsize decimal(3,1)
SELECT @productsize =  productSize ,@productId = productId,@orderquantity = quantity   from inserted
UPDATE storehouse set quantity = quantity + @orderquantity where productId = @productId and productSize = @productsize
END
END
/* chi duoc pick 1 lan */


CREATE procedure [dbo].[checkquantity]  
(
@productId int

)  
AS  
BEGIN
select a.[36],b.[36.5],c.[37],d.[37.5],e.[38],f.[38.5],g.[39],h.[39.5],j.[40],k.[40.5],l.[41],z.[41.5],x.[42],v.[42.5],n.[43]
from (select quantity as '36'
from storehouse
where productSize = 36 and productId = @productId) as a,(select quantity as '36.5'
from storehouse
where productSize = 36.5 and productId = @productId) as b,(select quantity as '37'
from storehouse
where productSize = 37 and productId = @productId) as c,(select quantity as '37.5'
from storehouse
where productSize = 37.5 and productId = @productId) as d,(select quantity as '38'
from storehouse
where productSize = 38 and productId = @productId) as e,(select quantity as '38.5'
from storehouse
where productSize = 38.5 and productId = @productId) as f,(select quantity as '39'
from storehouse
where productSize = 39 and productId = @productId) as g,(select quantity as '39.5'
from storehouse
where productSize = 39.5 and productId = @productId) as h,(select quantity as '40'
from storehouse
where productSize = 40 and productId = @productId) as j,(select quantity as '40.5'
from storehouse
where productSize = 40.5 and productId = @productId) as k,(select quantity as '41'
from storehouse
where productSize = 41 and productId = @productId) as l,(select quantity as '41.5'
from storehouse
where productSize = 41.5 and productId = @productId) as z,(select quantity as '42'
from storehouse
where productSize = 42 and productId = @productId) as x,(select quantity as '42.5'
from storehouse
where productSize = 42.5 and productId = @productId) as v,(select quantity as '43'
from storehouse
where productSize = 43 and productId = @productId) as n
END
drop proc checkquantity
exec checkquantity 15
CREATE procedure [dbo].[updatequantity]  
(
@productId Int,
@productsize decimal(3,1),
@quantity Int

)  
AS  
BEGIN
update storehouse set quantity = @quantity where productId = @productId and productSize = @productsize
END
CREATE TRIGGER checkupdatequantity on storehouse for update AS
BEGIN
DECLARE @newquantity Int
set @newquantity = (select quantity from inserted)
IF @newquantity < 0
BEGIN
ROLLBACK TRAN;
END
END
drop trigger checkupdatequantity
drop proc updatequantity
exec updatequantity 15,36,100

/** api banner **/
CREATE procedure [dbo].[createbanner]  
(
@bannerId Int,
@content nvarchar(100),
@bannerImage text

)  
AS  
BEGIN
insert into banner(bannerId,content,bannerImage) values ( @bannerId,@content,@bannerImage)
END
exec createbanner 1,'asdads','asdasd'
CREATE procedure [dbo].[deletebanner]  
(
@bannerId Int

)  
AS  
BEGIN
delete banner where bannerId = @bannerId
END
exec deletebanner 1
CREATE procedure [dbo].[updatebanner]  
(
@bannerId Int,
@content nvarchar(100),
@bannerImage text

)  
AS  
BEGIN
update banner set content = @content,bannerImage = @bannerImage where bannerId = @bannerId
END
drop proc updatebanner
EXEC updatebanner 1,'xc','sadsd'
/* api shipservice */
CREATE procedure [dbo].[createshipservice]  
(
@Id Int,
@shipName nvarchar(50),
@shipDay Int,
@ShipPrice Int
)  
AS  
BEGIN
insert into Ship(Id,shipName,shipDay,ShipPrice) values ( @Id,@shipName,@shipDay,@ShipPrice)
END
CREATE procedure [dbo].[deleteshipservice]  
(
@Id Int

)  
AS  
BEGIN
delete Ship where Id = @Id
END
CREATE procedure [dbo].[updateshipservice]  
(
@Id Int,
@shipName nvarchar(50),
@shipDay Int,
@ShipPrice Int
)  
AS  
BEGIN
update Ship set shipName = @shipName,shipDay = @shipDay,ShipPrice = @ShipPrice where Id = @Id
END