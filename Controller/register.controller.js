const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { ModelRegister, checkExist } = require("../Model/register.service");
module.exports = {
    ControllerRegister: (req, res) => {
        try {
            const body = req.body;
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            ModelRegister(body);
            res.status(201).json({
                success: 1,
                message: "đăng ký thành công "
            });
        } catch (err) {
            res.status(400).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    checkExist: (req, res, next) => {
        try {
            const body = req.body;
            console.log(body);
            checkExist(body).then((result) => {
                if (result == "2") {
                    res.status(401).json({
                        success: 0,
                        message: "Địa chỉ email đã có người sử dùng"
                    });
                } else {
                    if (result == '3') {
                        res.status(401).json({
                            success: 0,
                            message: "Số điện thoại đã có người sử dụng"
                        });
                    } else {
                        next();
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