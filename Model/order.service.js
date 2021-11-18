const sql = require("mssql");
const { RoleConnection, noLoginConnection, AdminConnection } = require("../auth/auth_dbms");
module.exports = {
    addToCartModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let ts = Date.now();
            let date_ob = new Date(ts + 1 * 24 * 60 * 60 * 1000);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            let fullDate = year + "-" + month + "-" + date;
            let orderId = "OD" + data.userId + "_" + ts;
            let res = await pool
                .request()
                .input("productId", sql.Int, data.productId)
                .input("quantity", sql.Int, data.quantity)
                .query("select dbo.tongtien(@productId,@quantity) as total");
            let total = res.recordset[0].total;
            await pool
                .request()
                .input("orderId", sql.VarChar(64), orderId)
                .input("userId", sql.Int, data.userId)
                .input("totalPrice", sql.Int, total)
                .input("orderDate", sql.Date, fullDate)
                .input("productId", sql.Int, data.productId)
                .input("productSize", sql.Decimal(3, 1), data.productSize)
                .input("quantity", sql.Int, data.quantity)
                .execute("addtocart");
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    viewCartModel: async(userId, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool
                .request()
                .input("userId", sql.Int, userId)
                .query("SELECT * FROM dbo.cartview(@userId)");
            console.log(res.recordset);
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    checkOutModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool
                .request()
                .input("orderId", sql.VarChar(64), data.orderId)
                .input("Id", sql.Int, data.shipId)
                .execute("updateship");
            let shipDay = res.recordset[0].shipDay;
            let shipPrice = res.recordset[0].ShipPrice;
            let date_ob = new Date(Date.now() + shipDay * 24 * 60 * 60 * 1000);
            let date = date_ob.getDate() + 1;
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            let fullDate = year + "-" + month + "-" + date;
            await pool
                .request()
                .input("orderId", sql.VarChar(64), data.orderId)
                .input("expireDate", sql.Date, fullDate)
                .input("shipPrice", sql.Int, shipPrice)
                .execute("checkout");
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    deleteCartModel: async(orderId, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            await pool
                .request()
                .input("orderId", sql.VarChar(64), orderId)
                .execute("deletecart");
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    viewOrderXlModel: async(token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().query("SELECT * FROM dbo.viewxl");
            console.log(res.recordset);
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    viewOrderGhModel: async(token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().query("select * from viewgh");
            console.log(res.recordset);
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    viewOrderNhModel: async(token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().query("select * from viewnh");
            console.log(res.recordset);
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    viewOrderHuyModel: async(token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().query("select * from viewhuy");
            console.log(res.recordset);
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    shipOrderModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            await pool
                .request()
                .input("shipperId", sql.Int, data.shipperId)
                .input("orderId", sql.VarChar(64), data.orderId)
                .execute("shiporder");
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    orderHistoryModel: async(userId, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool
                .request()
                .input("userId", sql.Int, userId)
                .execute("orderhistory");
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    orderHistoryDetailModel: async(orderId, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool
                .request()
                .input("orderId", sql.VarChar(64), orderId)
                .query("select * from orderhistorydetail(@orderId)");
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    deleteOrderModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            await pool.request().input('orderId', sql.VarChar(64), data).execute('deleteorder');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
};