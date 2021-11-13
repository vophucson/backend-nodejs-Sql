const { verify } = require("jsonwebtoken");
//const{verifyUser} = require("../api/login/login.service");
module.exports = {
    checkTokenAdmin: (req, res, next) => {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            let token = req.headers.authorization.split("Bearer ")[1];
            if (token) {
                //jwt.verify(token, secretOrPublicKey, [options, callback])
                //verify a token symmetric
                verify(token, "vophucson", (err, decoded) => {
                    if (err) {
                        res.status(401).json({
                            success: 0,
                            message: "Token hết hạn",
                        });
                    } else {
                        if (decoded.result.role == "admin") {
                            next();
                        }
                        //403 Forbidden, The client doesn't have access rights to the content
                        //So server is refusing to give the requested resource
                        //Unlike 401, the client's identity is known to the server
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
                verify(token, "vophucson", (err, decoded) => {
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
                //jwt.verify(token, secretOrPublicKey, [options, callback])
                //verify a token symmetric
                verify(token, "vophucson", (err, decoded) => {
                    if (err) {
                        res.status(401).json({
                            success: 0,
                            message: "Token hết hạn",
                        });
                    } else {
                        if (decoded.result.role == "shipper") {
                            next();
                        }
                        //403 Forbidden, The client doesn't have access rights to the content
                        //So server is refusing to give the requested resource
                        //Unlike 401, the client's identity is known to the server
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