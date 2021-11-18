const sql = require("mssql");
const { RoleConnection, noLoginConnection } = require("../auth/auth_dbms");
module.exports = {
    checkQuantityModel: async(productId, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().input('productId', sql.Int, productId).execute('checkquantity');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    updateQuantityModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            await pool.request().input('productId', sql.Int, data.productId).input('productSize', sql.Decimal(3, 1), data.productSize).
            input('quantity', sql.Int, data.quantity).execute('updatequantity');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },



};