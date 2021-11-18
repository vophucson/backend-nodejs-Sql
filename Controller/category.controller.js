const { getAllCategory, createCategoryModel, deleteCategoryModel, updateCategoryModel } = require("../Model/category.service");

module.exports = {
    getAllCategory: (req, res) => {
        try {
            getAllCategory().then((result) => {
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
    createCategoryController: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            createCategoryModel(body, token);
            res.json({
                success: 1,
                message: "Thêm thương hiệu thành công "
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    deleteCategoryController: (req, res) => {
        try {
            const id = req.query.categoryId;
            let token = req.headers.authorization.split("Bearer ")[1];
            deleteCategoryModel(id, token);
            res.json({
                success: 1,
                message: "Xóa thương hiệu thành công "
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    updateCategoryController: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            updateCategoryModel(body, token);
            res.json({
                success: 1,
                message: "Cập nhật thương hiệu thành công "
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },

}