const { checkQuantityModel, updateQuantityModel } = require('../Model/storehouse.service');
module.exports = {
    checkQuantityController: (req, res) => {
        try {
            const id = req.query.productId;
            checkQuantityModel(id).then((result) => {
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
    updateQuantityController: (req, res) => {
        try {
            const body = req.body;
            updateQuantityModel(body);
            res.json({
                success: 1,
                message: "Cập nhật số lượng thành công"
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },

}