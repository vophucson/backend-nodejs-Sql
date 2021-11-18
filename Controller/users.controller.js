const {
    getUserByUserId,
    updateUser,
    getPassword,
    newPassword,
    getAllUserModel,
    setRoleModel,
    deleteUserModel,
    getSearchUserModel,
    getUserModel,
    getAdminModel,
    checkUpdateModel
} = require("../Model/users.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
module.exports = {
    getUserById: (req, res) => {
        const id = req.query.id;
        let token = req.headers.authorization.split("Bearer ")[1];
        try {
            getUserByUserId(id, token).then((result) => {
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
    updateUser: (req, res) => {
        try {
            const body = req.body;
            let token = req.headers.authorization.split("Bearer ")[1];
            updateUser(body, token);
            res.status(200).json({
                success: 1,
                data: "Thay đổi thông tin tài khoản thành công "
            });
        } catch (err) {
            res.status(400).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    changePassword: (req, res) => {
        try {
            const body = req.body;
            getPassword(body.Id).then((result) => {
                const CheckResult = compareSync(body.oldpassword, result);
                if (CheckResult) {
                    try {
                        const salt = genSaltSync(10);
                        body.password = hashSync(body.password, salt);
                        newPassword(body.Id, body.password);
                        res.status(200).json({
                            success: 1,
                            data: "Thay đổi mật khẩu thành công  "
                        });
                    } catch (err) {
                        res.status(400).json({
                            success: 0,
                            message: "Đã có lỗi gì đó xảy ra"
                        });
                    }
                } else {
                    res.status(400).json({
                        success: 0,
                        message: "Mật khẩu hiện tại không đúng"
                    });
                }
            });
        } catch (err) {
            res.status(400).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    getAllUserController: (req, res) => {
        try {
            let token = req.headers.authorization.split("Bearer ")[1];
            getAllUserModel(token).then((result) => {
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
    setRoleController: (req, res) => {
        try {
            const body = req.body;
            setRoleModel(body);
            res.json({
                success: 1,
                message: "Thay đổi quền thành công "
            });
        } catch (err) {
            res.status(400).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    deleteUserController: (req, res) => {
        try {
            const Id = req.query.Id;
            let token = req.headers.authorization.split("Bearer ")[1];
            deleteUserModel(Id, token);
            res.json({
                success: 1,
                message: "Xóa tài khoản thành công"
            });
        } catch (err) {
            res.status(400).json({
                success: 0,
                message: "Đã có lỗi gì đó xảy ra"
            });
        }
    },
    getSearchUserController: (req, res) => {
        const name = req.query.username;
        const username = '%' + name + '%';
        try {
            let token = req.headers.authorization.split("Bearer ")[1];
            getSearchUserModel(username, token).then((result) => {
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
    getUserController: (req, res) => {
        try {
            let token = req.headers.authorization.split("Bearer ")[1];
            getUserModel(token).then((result) => {
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
    getAdminController: (req, res) => {
        try {
            let token = req.headers.authorization.split("Bearer ")[1];
            getAdminModel(token).then((result) => {
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
    checkUpdateController: (req, res, next) => {
        try {
            const body = req.body;
            console.log(body)
            let token = req.headers.authorization.split("Bearer ")[1];
            checkUpdateModel(body, token).then((result) => {
                if (result == 0) {
                    res.status(401).json({
                        success: 0,
                        message: "Số điện thoại đã có người sử dụng"
                    });
                } else {
                    next();
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