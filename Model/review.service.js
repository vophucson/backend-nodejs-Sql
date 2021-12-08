const sql = require("mssql");
var config = require("../dbconfig");
module.exports = {
    sendReviewModel: async(data) => {
        let pool = await sql.connect(config);
        try {
            let ts = Date.now();
            let date_ob = new Date(ts + 1 * 24 * 60 * 60 * 1000);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            let fullDate = year + "-" + month + "-" + date;
            let reviewId = 'RV' + data.userId + '_' + ts;
            await pool.request().input('reviewId', sql.VarChar(64), reviewId).
            input('productId', sql.Int, data.productId).input('star', sql.Int, data.star).
            input('userId', sql.Int, data.userId).input('comment', sql.NText, data.comment).input('dayComment', sql.Date, fullDate).execute('sendreview');
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }
    },
    viewCommentModel: async(productId) => {
        let pool = await sql.connect(config);
        try {

            let res = await pool.request().input('productId', sql.Int, productId).query('select * from viewcomment(@productId) order by dayComment DESC');
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            pool.close();
        }

    }
}