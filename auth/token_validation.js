const { verify } = require("jsonwebtoken");
module.exports = {
    checkTokenAdmin: (req, res, next) => {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            let token = req.headers.authorization.split("Bearer ")[1];
            if (token) {
                verify(token, "nhom11sql", (err, decoded) => {
                    if (err) {
                        res.status(401).json({
                            success: 0,
                            message: "Token hết hạn",
                        });
                    } else {
                        if (decoded.result.role == "admin") {
                            next();
                        }
                        else {
                            res.status(403).json({
                                success: 2,
                                message: "Bạn không có quyền sử dụng chức năng này",
                            });
                        }
                    }
                });
            } else {
                res.status(401).json({
                    success: 0,
                    message: "Token hết hạn",
                });
            }
        } else {
            return res.status(403).json({
                success: 0,
                message: "Lỗi hệ thống",
            });
        }
    },
    checkToken: (req, res, next) => {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            let token = req.headers.authorization.split("Bearer ")[1];
            if (token) {
                verify(token, "nhom11sql", (err, decoded) => {
                    if (err) {
                        res.status(401).json({
                            success: 0,
                            message: "Token hết hạn",
                        });
                    } else {

                        next();
                    }
                });
            } else {
                return res.status(401).json({
                    success: 0,
                    message: "Token hết hạn",
                });
            }
        } else {
            return res.status(403).json({
                success: 0,
                message: "Lỗi hệ thống",
            });
        }
    },
    checkTokenShipper: (req, res, next) => {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            let token = req.headers.authorization.split("Bearer ")[1];
            if (token) {
                verify(token, "nhom11sql", (err, decoded) => {
                    if (err) {
                        res.status(401).json({
                            success: 0,
                            message: "Token hết hạn",
                        });
                    } else {
                        if (decoded.result.role == "shipper") {
                            next();
                        }
                        else {
                            res.status(403).json({
                                success: 2,
                                message: "Bạn không có quyền sử dụng chức năng này",
                            });
                        }
                    }
                });
            } else {
                res.status(401).json({
                    success: 0,
                    message: "Token hết hạn",
                });
            }
        } else {
            return res.status(403).json({
                success: 0,
                message: "Lỗi hệ thống",
            });
        }
    },
};