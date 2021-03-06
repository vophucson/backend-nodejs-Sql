const {
    getUserByUserEmail,
    getUserByAdminEmail,
} = require("../Model/login.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
    login: (req, res) => {
        try {
            const body = req.body;
            console.log(body);
            getUserByUserEmail(body.email).then((result) => {
                if (result == undefined) {
                    return res.status(400).json({
                        success: 0,
                        data: "Địa chỉ email không tồn tại"
                    });
                } else {
                    const CheckResult = compareSync(body.password, result.password);
                    if (CheckResult) {
                        const jsontoken = sign({ result: result }, "nhom11sql", {
                            expiresIn: "24h"
                        });
                        res.json({
                            success: 1,
                            token: jsontoken,
                            IdUser: Number(result.Id)
                        });
                    } else {
                        return res.status(401).json({
                            success: 0,
                            data: "Mật khẩu đăng nhập không đúng"
                        });
                    }
                }
            });
        } catch (err) {
            res.status(400).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    loginAdmin: (req, res) => {
        try {
            const body = req.body;
            console.log(body);
            getUserByAdminEmail(body.email).then((result) => {
                if (result == undefined) {
                    return res.status(400).json({
                        success: 0,
                        data: "Địa chỉ email không tồn tại"
                    });
                } else {
                    const CheckResult = compareSync(body.password, result.password);
                    if (CheckResult) {
                        const jsontoken = sign({ result: result }, "nhom11sql", {
                            expiresIn: "24h"
                        });
                        res.json({
                            success: 1,
                            token: jsontoken,
                            IdUser: Number(result.Id)
                        });
                    } else {
                        return res.status(401).json({
                            success: 0,
                            data: "Mật khẩu đăng nhập không đúng"
                        });
                    }
                }
            });
        } catch (err) {
            res.status(400).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    }
}