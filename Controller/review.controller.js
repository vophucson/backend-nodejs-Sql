const { sendReviewModel, viewCommentModel } = require("../Model/review.service")


module.exports = {
    sendReviewController: (req, res) => {
        try {
            const body = req.body;
            sendReviewModel(body);
            res.json({
                success: 1,
                message: "Đánh giá sản phẩm thành công"
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    viewCommentController: (req, res) => {
        const id = req.query.productId;
        try {
            viewCommentModel(id).then((result) => {
                res.json({
                    success: 1,
                    data: result
                });
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
}