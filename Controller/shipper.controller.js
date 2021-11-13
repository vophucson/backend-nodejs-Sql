const { getAllShipperModel, shipperOrderModel, shipperOrderDetailModel, pickupOrderModel, finishOrderModel, cancelOrderModel } = require('../Model/shipper.service');
module.exports = {
    getAllShipperController: (req, res) => {
        try {
            let token = req.headers.authorization.split("Bearer ")[1];
            getAllShipperModel(token).then((result) => {
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
    shipperOrderController: (req, res) => {
        try {
            const id = req.query.shipperId
            let token = req.headers.authorization.split("Bearer ")[1];
            shipperOrderModel(id, token).then((result) => {
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
    shipperOrderDetailController: (req, res) => {
        try {
            const id = req.query.orderId
            let token = req.headers.authorization.split("Bearer ")[1];
            shipperOrderDetailModel(id, token).then((result) => {
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
    pickupOrderController: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            pickupOrderModel(body, token).then((result) => {

                res.json({
                    success: 1,
                    message: "Lấy hàng thành công"
                });
            });
        } catch (err) {
            res.status(400).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    finishOrderController: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            finishOrderModel(body, token).then((result) => {

                res.json({
                    success: 1,
                    message: "Giao hàng thành công"
                });
            });
        } catch (err) {
            res.status(400).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    cancelOrderController: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            cancelOrderModel(body, token).then((result) => {
                res.json({
                    success: 1,
                    message: "Hủy đơn hàng thành công"
                });

            });
        } catch (err) {
            res.status(400).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
}