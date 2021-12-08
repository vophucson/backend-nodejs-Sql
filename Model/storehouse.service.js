const sql = require("mssql");
var config = require("../dbconfig");
module.exports = {
    checkQuantityModel: async(productId) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().input('productId', sql.Int, productId).execute('checkquantity');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    updateQuantityModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            await pool.request().input('productId', sql.Int, data.productId).input('productSize', sql.Decimal(3, 1), data.productSize).
            input('quantity', sql.Int, data.quantity).execute('updatequantity');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },



};