const sql = require("mssql");
const { RoleConnection, noLoginConnection } = require("../auth/auth_dbms");
const { token } = require("morgan");
module.exports = {
    getAllShipperModel: async(token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().query('select * from viewshipper');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    shipperOrderModel: async(shipperId, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().input('shipperId', sql.Int, shipperId).execute('shipperoder');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    shipperOrderDetailModel: async(orderId, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().input('orderId', sql.VarChar(64), orderId).execute('shipperoderdetail');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    pickupOrderModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            await pool.request().input('orderId', sql.VarChar(64), data.orderId).execute('pickuporder');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    finishOrderModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            await pool.request().input('orderId', sql.VarChar(64), data.orderId).execute('finishorder');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    cancelOrderModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            await pool.request().input('orderId', sql.VarChar(64), data.orderId).execute('cancelorder');

        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },


};