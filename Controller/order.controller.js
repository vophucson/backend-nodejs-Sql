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
            addToCartModel(body);
            res.json({
                success: 1,
                message: "Thêm vào giỏ hàng thành công"
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
            viewCartModel(id).then((result) => {
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
            checkOutModel(body);
            res.json({
                success: 1,
                message: "Cảm ơn bạn đã mua hàng"
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
            deleteCartModel(id);
            res.json({
                success: 1,
                message: "Xóa đơn hàng thành công "
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
            viewOrderXlModel().then((result) => {
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
            viewOrderGhModel().then((result) => {
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
            viewOrderNhModel().then((result) => {
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
            viewOrderHuyModel().then((result) => {
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
            shipOrderModel(body);
            res.json({
                success: 1,
                message: "Giao cho shipper thành công"
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
            orderHistoryModel(id).then((result) => {
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
            orderHistoryDetailModel(id).then((result) => {
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
            deleteOrderModel(id);
            res.json({
                success: 1,
                message: "Xóa đơn hàng thành công "
            });
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },

}