const sql = require("mssql");
var config = require("../dbconfig");
module.exports = {
    getAllProduct: async() => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().query('select * from viewallproduct');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    getProductId: async(categoryId) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().input('categoryId', sql.VarChar(64), categoryId).execute('getproductid');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    getProductById: async(productId) => {
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().input('productId', sql.Int, productId).execute('getproductdetail');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    searchProduct: async(productName) => {
        newName = "%" + productName + "%";
        let pool = await sql.connect(config);
        try {
            let res = await pool.request().input('productName', sql.NVarChar(64), newName).execute('searchproduct');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }

    },
    createProductModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            let resId = await pool.request().query("select MAX(productId) as id from products");
            let id = resId.recordsets[0][0]['id'];
            let resCategoryId = await pool.request().input('categoryName', sql.VarChar(64), data.categoryName).query('select * from searchcategoryId(@categoryName)');
            let categoryId = resCategoryId.recordsets[0][0]['categoryId'];
            await pool.request().input('productId', sql.Int, id + 1).input('productName', sql.NVarChar(64), data.productName).
            input('categoryId', sql.Int, categoryId).input('productPrice', sql.Int, data.productPrice).input('imageUrl', sql.Text, data.imageUrl).
            input('description', sql.NText, data.description).execute('createproduct');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    updateProductModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            let resCategoryId = await pool.request().input('categoryName', sql.VarChar(64), data.categoryName).query('select * from searchcategoryId(@categoryName)');
            let categoryId = resCategoryId.recordsets[0][0]['categoryId'];
            await pool.request().input('productId', sql.Int, data.productId).input('productName', sql.NVarChar(64), data.productName).
            input('categoryId', sql.Int, categoryId).input('productPrice', sql.Int, data.productPrice).input('imageUrl', sql.Text, data.imageUrl).
            input('description', sql.NText, data.description).execute('updateproduct');

        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    deleteProductModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            await pool.request().input('productId', sql.Int, data).execute('deleteproduct');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
}