const { createBannerModel, AllBannerModel, deleteBannerModel, updateBannerModel } = require("../Model/banner.service");

module.exports = {
    createBannerController: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            createBannerModel(body, token);
            res.status(201).json({
                success: 1,
                message: "Thêm quảng cáo thành công "
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    AllBannerController: (req, res) => {
        try {
            AllBannerModel().then((result) => {
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
    deleteBannerController: (req, res) => {
        try {
            const id = req.query.bannerId;
            let token = req.headers.authorization.split("Bearer ")[1];
            deleteBannerModel(id, token);
            res.json({
                success: 1,
                message: "Xóa quảng cáo thành công "
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    updateBannerController: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            updateBannerModel(body, token);
            res.json({
                success: 1,
                message: "Cập nhật quảng cáo thành công"
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },


}