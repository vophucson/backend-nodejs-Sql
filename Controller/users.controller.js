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
        try {
            getUserByUserId(id).then((result) => {
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
            updateUser(body);
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
            getAllUserModel().then((result) => {
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
            deleteUserModel(Id);
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
            getSearchUserModel(username).then((result) => {
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

            getUserModel().then((result) => {
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

            getAdminModel().then((result) => {
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

            checkUpdateModel(body).then((result) => {
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