const sql = require("mssql");
const { RoleConnection, noLoginConnection } = require("../auth/auth_dbms");
module.exports = {
    createBannerModel: async(data, token) => {
        console.log(RoleConnection(token));
        let pool = await sql.connect(RoleConnection(token));
        try {
            let id = 0;
            let resId = await pool.request().query("select MAX(bannerId) as id from banner");
            if (resId.recordset[0]['id'] == null) {
                id = 0;
            } else {
                id = resId.recordset[0]['id'];
            }
            let res = await pool.request().input('bannerId', sql.Int, id + 1).input('content', sql.NVarChar(100), data.content).
            input('bannerImage', sql.Text, data.bannerImage).execute('createbanner');
            return res;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }

    },
    AllBannerModel: async() => {
        let pool = await sql.connect(noLoginConnection());
        try {
            let res = await pool.request().query("select * from banner");
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    deleteBannerModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().input('bannerId', sql.Int, data).execute('deletebanner');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    updateBannerModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().input('bannerId', sql.Int, data.bannerId).input('content', sql.NVarChar(100), data.content).
            input('bannerImage', sql.Text, data.bannerImage).execute('updatebanner');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },

}