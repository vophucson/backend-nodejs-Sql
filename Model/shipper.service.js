const sql = require("mssql");
var config = require("../dbconfig");
const { token } = require("morgan");
module.exports = {
    getAllShipperModel: async() => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().query('select * from viewshipper');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    shipperOrderModel: async(shipperId) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().input('shipperId', sql.Int, shipperId).execute('shipperoder');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    shipperOrderDetailModel: async(orderId) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().input('orderId', sql.VarChar(64), orderId).execute('shipperoderdetail');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    pickupOrderModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            await pool.request().input('orderId', sql.VarChar(64), data.orderId).execute('pickuporder');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    finishOrderModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            await pool.request().input('orderId', sql.VarChar(64), data.orderId).execute('finishorder');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    cancelOrderModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            await pool.request().input('orderId', sql.VarChar(64), data.orderId).execute('cancelorder');

        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },


};