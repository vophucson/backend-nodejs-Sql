const sql = require("mssql");
var config = require("../dbconfig");
module.exports = {
    addToCartModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            let ts = Date.now();
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
                .input("productId", sql.Int, data.productId)
                .input("productSize", sql.Decimal(3, 1), data.productSize)
                .input("quantity", sql.Int, data.quantity)
                .execute("addtocart");
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    viewCartModel: async(userId) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool
                .request()
                .input("userId", sql.Int, userId)
                .query("SELECT * FROM dbo.cartview(@userId)");
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    checkOutModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            let ts = Date.now();
            let date_ob = new Date(ts + 1 * 24 * 60 * 60 * 1000);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            let fullDate = year + "-" + month + "-" + date;
            await pool
                .request()
                .input("orderId", sql.VarChar(64), data.orderId)
                .input("orderDate", sql.Date, fullDate)
                .execute("checkout");
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    deleteCartModel: async(orderId) => {
        let pool = await sql.connect(config);
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
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().query("SELECT * FROM dbo.viewxl");
            console.log(res.recordset);
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    viewOrderGhModel: async(token) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().query("select * from viewgh");
            console.log(res.recordset);
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    viewOrderNhModel: async(token) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().query("select * from viewnh");
            console.log(res.recordset);
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    viewOrderHuyModel: async() => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().query("select * from viewhuy");
            console.log(res.recordset);
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    shipOrderModel: async(data) => {
        let pool = await sql.connect(config);
        let ts = Date.now();
        let date_ob = new Date(ts + 3 * 24 * 60 * 60 * 1000);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let fullDate = year + "-" + month + "-" + date;
        try {
            await pool
                .request()
                .input("shipperId", sql.Int, data.shipperId)
                .input("orderId", sql.VarChar(64), data.orderId)
                .input("expireDate", sql.Date, fullDate)
                .execute("shiporder");
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    orderHistoryModel: async(userId) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool
                .request()
                .input("userId", sql.Int, userId)
                .execute("orderhistory");
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    orderHistoryDetailModel: async(orderId) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool
                .request()
                .input("orderId", sql.VarChar(64), orderId)
                .query("select * from orderhistorydetail(@orderId)");
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    deleteOrderModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            await pool.request().input('orderId', sql.VarChar(64), data).execute('deleteorder');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
};