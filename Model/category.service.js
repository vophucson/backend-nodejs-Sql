const sql = require("mssql");
var config = require("../dbconfig");
module.exports = {
    getAllCategory: async() => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().query("select * from categories");
            console.log(res.recordset);
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    createCategoryModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            let resId = await pool.request().query("select MAX(categoryId) as id from categories");
            let id = resId.recordsets[0][0]['id'];
            await pool.request().input('categoryId', sql.Int, id + 1).
            input('categoryName', sql.VarChar(64), data.categoryName).input('categoryImage', sql.Text, data.categoryImage).execute('createcategory');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }

    },
    deleteCategoryModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            await pool.request().input('categoryId', sql.Int, data).execute('deletecategory');
            console.log(res['rowsAffected'][0]);
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    updateCategoryModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            await pool.request().input('categoryId', sql.Int, data.categoryId).
            input('categoryName', sql.VarChar(64), data.categoryName).
            input('categoryImage', sql.Text, data.categoryImage).execute('updatecategory');
            console.log(res['rowsAffected'][0]);
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
}