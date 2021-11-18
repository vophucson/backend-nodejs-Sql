const { getShipServiceModel, createShipServiceModel, deleteShipServiceModel, updateShipServiceModel } = require("../Model/shipservice.service");

module.exports = {
    getShipServiceController: (req, res) => {
        try {
            getShipServiceModel().then((result) => {
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
    createShipServiceController: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            createShipServiceModel(body, token);
            res.status(201).json({
                success: 1,
                message: "Thêm dịch vụ giao hàng thành công "
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    deleteShipServiceController: (req, res) => {
        try {
            const id = req.query.Id;
            let token = req.headers.authorization.split("Bearer ")[1];
            deleteShipServiceModel(id, token);
            res.json({
                success: 1,
                message: "Xóa dịch vụ giao hàng thành công"
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    updateShipServiceController: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            updateShipServiceModel(body, token);
            res.json({
                success: 1,
                message: "Cập nhật dịch vụ giao hàng thành công"
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
}