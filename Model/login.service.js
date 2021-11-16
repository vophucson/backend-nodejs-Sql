const sql = require("mssql");
const { RoleConnection, noLoginConnection, AdminConnection, LoginConnection } = require("../auth/auth_dbms");
module.exports = {
    getPasswordByEmail: async(email) => {
        let pool = await sql.connect(noLoginConnection());
        try {
            let res = await pool.request().input("email", sql.NVarChar(50), email).execute('getpassword');
            console.log(res.recordsets[0][0]['password']);
            return res.recordsets[0][0]['password'];
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    getPasswordAdminByEmail: async(email) => {
        let pool = await sql.connect(noLoginConnection());
        try {
            let res = await pool.request().input("email", sql.NVarChar(50), email).execute('getpasswordadmin');
            console.log(res.recordsets[0][0]['password']);
            return res.recordsets[0][0]['password'];
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    getUserByUserEmail: async(email, password) => {
        let pool = await sql.connect(LoginConnection(email, password));
        try {
            let res = await pool.request().input("email", sql.NVarChar(50), email).execute('dangnhap');
            console.log(res.recordsets[0][0]);
            return res.recordsets[0][0];
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    getUserByAdminEmail: async(email, password) => {
        let pool = await sql.connect(LoginConnection(email, password));
        try {
            let res = await pool.request().input("email", sql.NVarChar(50), email).execute('dangnhapadmin');
            return res.recordsets[0][0];
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },



};