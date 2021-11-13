const sql = require("mssql");
const { RoleConnection, noLoginConnection, SysAdminConnection } = require("../auth/auth_dbms");
const config = require("../dbconfig");
module.exports = {
    ModelRegister: async(data) => {
        let pool = await sql.connect(SysAdminConnection());
        try {
            let id = await pool.request().query("select MAX(Id) as userid from registration");
            let userid = id.recordsets[0][0]['userid'];
            let res = await pool.request().input("Id", sql.Int, userid + 1).
            input("username", sql.NVarChar(50), data.username).
            input("password", sql.NVarChar(100), data.password).
            input("phone", sql.NVarChar(50), data.phone).
            input("email", sql.NVarChar(50), data.email).
            input("address", sql.NVarChar(50), data.address).
            execute("dangky");
            return res.recordsets;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }

    },
    checkExist: async(data) => {
        let pool = await sql.connect(SysAdminConnection());
        try {
            let res1 = await pool.request().input("email", sql.NVarChar(50), data.email).execute('dangkyuseremail');
            if (res1.recordsets[0][0] != undefined) {
                await pool.close();
                return "2";
            } else {
                let res2 = await pool.request().input("phone", sql.NVarChar(50), data.phone).execute('dangkyuserphone');
                if (res2.recordsets[0][0] != undefined) {
                    await pool.close();
                    return "3";
                }
            }


        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    }


};