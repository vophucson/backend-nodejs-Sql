const {
    addToCartModel,
    viewCartModel,
    checkOutModel,
    deleteCartModel,
    viewOrderXlModel,
    viewOrderGhModel,
    viewOrderNhModel,
    viewOrderHuyModel,
    shipOrderModel,
    orderHistoryModel,
    orderHistoryDetailModel,
    deleteOrderModel
} = require("../Model/order.service");

module.exports = {
    addToCartController: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            addToCartModel(body, token).then((result) => {
                res.json({
                    success: 1,
                    message: "Thêm vào giỏ hàng thành công"
                });
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    viewCartController: (req, res) => {
        try {
            const id = req.query.userId;
            let token = req.headers.authorization.split("Bearer ")[1];
            viewCartModel(id, token).then((result) => {
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
    checkOutController: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            checkOutModel(body, token).then((result) => {
                res.json({
                    success: 1,
                    message: "Cảm ơn bạn đã mua hàng"
                });
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    deleteCartController: (req, res) => {
        try {
            const id = req.query.orderId;
            let token = req.headers.authorization.split("Bearer ")[1];
            deleteCartModel(id, token).then((result) => {
                res.json({
                    success: 1,
                    message: "Xóa đơn hàng thành công "
                });
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    viewOrderXlController: (req, res) => {
        try {
            let token = req.headers.authorization.split("Bearer ")[1];
            viewOrderXlModel(token).then((result) => {
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
    viewOrderGhController: (req, res) => {
        try {
            let token = req.headers.authorization.split("Bearer ")[1];
            viewOrderGhModel(token).then((result) => {
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
    viewOrderNhController: (req, res) => {
        try {
            let token = req.headers.authorization.split("Bearer ")[1];
            viewOrderNhModel(token).then((result) => {
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
    viewOrderHuyController: (req, res) => {
        try {
            let token = req.headers.authorization.split("Bearer ")[1];
            viewOrderHuyModel(token).then((result) => {
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
    shipOrderController: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            shipOrderModel(body, token).then((result) => {
                res.json({
                    success: 1,
                    message: "Giao cho shipper thành công"
                });

            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    orderHistoryController: (req, res) => {
        try {
            const id = req.query.userId;
            let token = req.headers.authorization.split("Bearer ")[1];
            orderHistoryModel(id, token).then((result) => {
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
    orderHistoryDetailController: (req, res) => {
        try {
            const id = req.query.orderId;
            let token = req.headers.authorization.split("Bearer ")[1];
            orderHistoryDetailModel(id, token).then((result) => {
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
    deleteOrderController: (req, res) => {
        try {
            const id = req.query.orderId;
            let token = req.headers.authorization.split("Bearer ")[1];
            deleteOrderModel(id, token).then((result) => {
                if (result != 0) {
                    res.json({
                        success: 1,
                        message: "Xóa đơn hàng thành công "
                    });
                } else {
                    res.status(401).json({
                        success: 0,
                        message: "Xóa đơn hàng không thành công"
                    });
                }
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },

}