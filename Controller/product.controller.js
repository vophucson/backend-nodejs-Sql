const { getAllProduct, getProductId, getProductById, searchProduct, createProductModel, updateProductModel, deleteProductModel } = require("../Model/product.service");

module.exports = {
    getAllProduct: (req, res) => {
        try {
            getAllProduct().then((result) => {
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
    getProductId: (req, res) => {
        const id = req.query.categoryId;
        try {
            getProductId(id).then((result) => {
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
    viewProductDetail: (req, res) => {
        const id = req.query.productId;
        try {
            getProductById(id).then((result) => {
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
    searchProduct: (req, res) => {
        const name = req.query.productName;
        try {
            searchProduct(name).then((result) => {
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
    createProductController: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            createProductModel(body, token).then((result) => {
                if (result != 0) {
                    res.status(201).json({
                        success: 1,
                        message: "Thêm sản phẩm thành công "
                    });
                } else {
                    res.status(401).json({
                        success: 0,
                        message: "Thêm sản phẩm không thành công"
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
    updateProductController: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            updateProductModel(body, token).then((result) => {
                if (result != 0) {
                    res.json({
                        success: 1,
                        message: "Cập nhật sản phẩm thành công "
                    });
                } else {
                    res.status(401).json({
                        success: 0,
                        message: "Cập nhật sản phẩm không thành công"
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
    deleteProductController: (req, res) => {
        try {
            const id = req.query.productId;
            let token = req.headers.authorization.split("Bearer ")[1];
            deleteProductModel(id, token).then((result) => {
                if (result != 0) {
                    res.json({
                        success: 1,
                        message: "Xóa sản phẩm thành công "
                    });
                } else {
                    res.status(401).json({
                        success: 0,
                        message: "Xóa sản phẩm không thành công"
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