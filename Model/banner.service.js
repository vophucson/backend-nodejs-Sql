const sql = require("mssql");
var config = require("../dbconfig");
module.exports = {
    createBannerModel: async(data) => {
        console.log(config);
        let pool = await sql.connect(config);
        try {
            let id = 0;
            let resId = await pool.request().query("select MAX(bannerId) as id from banner");
            if (resId.recordset[0]['id'] == null) {
                id = 0;
            } else {
                id = resId.recordset[0]['id'];
            }
            await pool.request().input('bannerId', sql.Int, id + 1).input('content', sql.NVarChar(100), data.content).
            input('bannerImage', sql.Text, data.bannerImage).execute('createbanner');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }

    },
    AllBannerModel: async() => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().query("select * from banner");
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    deleteBannerModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            await pool.request().input('bannerId', sql.Int, data).execute('deletebanner');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    updateBannerModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            await pool.request().input('bannerId', sql.Int, data.bannerId).input('content', sql.NVarChar(100), data.content).
            input('bannerImage', sql.Text, data.bannerImage).execute('updatebanner');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },

}