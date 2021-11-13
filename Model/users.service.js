const sql = require("mssql");
const { RoleConnection, noLoginConnection, SysAdminConnection } = require("../auth/auth_dbms");
const { token } = require("morgan");

module.exports = {
    getUserByUserId: async(id, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().input('Id', sql.Int, id).execute('getuserbyid');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    updateUser: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().
            input('username', sql.NVarChar(50), data.username).
            input('phone', sql.NVarChar(50), data.phone).
            input('address', sql.NVarChar(50), data.address).
            input('userimage', sql.Text, data.userimage).
            input('Id', sql.Int, data.Id).execute('edituser');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    getPassword: async(id) => {
        let pool = await sql.connect(SysAdminConnection());
        try {
            let res = await pool.request().input('Id', sql.Int, id).execute('getpasswordbyid');
            return res.recordset[0].password;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    newPassword: async(id, data) => {
        let pool = await sql.connect(SysAdminConnection());
        try {
            let res = await pool.request().input('Id', sql.Int, id).
            input('password', sql.NVarChar(100), data).execute('changepassword');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    getAllUserModel: async(token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().query('select * from registration');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    setRoleModel: async(data) => {
        let pool = await sql.connect(SysAdminConnection());
        try {
            let res = await pool.request().input('Id', sql.Int, data.Id).input('role', sql.NVarChar(50), data.role).execute('setrole');
            return res['rowsAffected'][0];
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    deleteUserModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().input('Id', sql.Int, data).execute('deleteuser');
            return res['rowsAffected'][0];
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    getSearchUserModel: async(username, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().input('username', sql.NVarChar(50), username).query('SELECT * from searchuser(@username)');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    getUserModel: async(token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().query('select * from viewuser');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    getAdminModel: async(token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().query('select * from viewadmin');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    checkUpdateModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().input('RegisID', sql.Int, data.Id).input('phone', sql.NVarChar(50), data.phone).query("select dbo.checkupdate(@RegisID,@phone) as status");
            return res.recordset[0]['status'];
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    }

};