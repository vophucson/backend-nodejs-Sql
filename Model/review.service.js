const sql = require("mssql");
const { RoleConnection, noLoginConnection } = require("../auth/auth_dbms");
module.exports = {
    sendReviewModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let ts = Date.now();
            let date_ob = new Date(ts + 1 * 24 * 60 * 60 * 1000);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            let fullDate = year + "-" + month + "-" + date;
            let reviewId = 'RV' + data.userId + '_' + ts;
            let res = await pool.request().input('reviewId', sql.VarChar(64), reviewId).
            input('productId', sql.Int, data.productId).input('star', sql.Int, data.star).
            input('userId', sql.Int, data.userId).input('comment', sql.NText, data.comment).input('dayComment', sql.Date, fullDate).execute('sendreview');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    viewCommentModel: async(productId) => {
        let pool = await sql.connect(noLoginConnection());
        try {

            let res = await pool.request().input('productId', sql.Int, productId).query('select * from viewcomment(@productId) order by dayComment DESC');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }

    }
}