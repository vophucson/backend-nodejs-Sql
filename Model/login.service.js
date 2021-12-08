const sql = require("mssql");
var config = require("../dbconfig");
module.exports = {
    getUserByUserEmail: async(email) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().input("email", sql.NVarChar(50), email).execute('dangnhap');
            console.log(res.recordsets[0][0]);
            return res.recordsets[0][0];
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    getUserByAdminEmail: async(email) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().input("email", sql.NVarChar(50), email).execute('dangnhapadmin');
            return res.recordsets[0][0];
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },



};