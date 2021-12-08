const sql = require("mssql");
var config = require("../dbconfig");
const { token } = require("morgan");

module.exports = {
    getUserByUserId: async(id) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().input('Id', sql.Int, id).execute('getuserbyid');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    updateUser: async(data) => {
        let pool = await sql.connect(config);
        try {
            await pool.request().
            input('username', sql.NVarChar(50), data.username).
            input('phone', sql.NVarChar(50), data.phone).
            input('address', sql.NVarChar(50), data.address).
            input('userimage', sql.Text, data.userimage).
            input('Id', sql.Int, data.Id).execute('edituser');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    getPassword: async(id) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().input('Id', sql.Int, id).execute('getpasswordbyid');
            return res.recordset[0].password;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    newPassword: async(id, data) => {
        let pool = await sql.connect(config);
        try {
            await pool.request().input('Id', sql.Int, id).
            input('password', sql.NVarChar(100), data).execute('changepassword');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    getAllUserModel: async(token) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().query('select * from registration');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    setRoleModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            await pool.request().input('Id', sql.Int, data.Id).input('role', sql.NVarChar(50), data.role).execute('setrole');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    deleteUserModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            await pool.request().input('Id', sql.Int, data).execute('deleteuser');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    getSearchUserModel: async(username) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().input('username', sql.NVarChar(50), username).query('SELECT * from searchuser(@username)');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    getUserModel: async() => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().query('select * from viewuser');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    getAdminModel: async() => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().query('select * from viewadmin');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    checkUpdateModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().input('RegisID', sql.Int, data.Id).input('phone', sql.NVarChar(50), data.phone).query("select dbo.checkupdate(@RegisID,@phone) as status");
            return res.recordset[0]['status'];
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    }

};