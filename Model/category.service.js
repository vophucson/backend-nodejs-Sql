const sql = require("mssql");
const { RoleConnection, noLoginConnection } = require("../auth/auth_dbms");
module.exports = {
    getAllCategory: async() => {
        let pool = await sql.connect(noLoginConnection());
        try {
            let res = await pool.request().query("select * from categories");
            console.log(res.recordset);
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    createCategoryModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let resId = await pool.request().query("select MAX(categoryId) as id from categories");
            let id = resId.recordsets[0][0]['id'];
            let res = await pool.request().input('categoryId', sql.Int, id + 1).
            input('categoryName', sql.VarChar(64), data.categoryName).input('categoryImage', sql.Text, data.categoryImage).execute('createcategory');
            return res['rowsAffected'][0];
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }

    },
    deleteCategoryModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().input('categoryId', sql.Int, data).execute('deletecategory');
            console.log(res['rowsAffected'][0]);
            return res['rowsAffected'][0];
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    updateCategoryModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let res = await pool.request().input('categoryId', sql.Int, data.categoryId).
            input('categoryName', sql.VarChar(64), data.categoryName).
            input('categoryImage', sql.Text, data.categoryImage).execute('updatecategory');
            console.log(res['rowsAffected'][0]);
            return res['rowsAffected'][0];
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
}