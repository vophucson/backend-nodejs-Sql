const {
    getUserById,
    updateUser,
    changePassword,
    getAllUserController,
    setRoleController,
    deleteUserController,
    getSearchUserController,
    getUserController,
    getAdminController,
    checkUpdateController
} = require("../Controller/users.controller");
const router = require("express").Router();
const { checkTokenAdmin, checkToken } = require("../auth/token_validation");

router.get("/getUserById", checkToken, getUserById);
router.patch("/updateUser", checkToken, checkUpdateController, updateUser);
router.post("/changePassword", checkToken, changePassword);
router.get("/getAllUser", checkTokenAdmin, getAllUserController);
router.patch('/setRole', checkTokenAdmin, setRoleController);
router.delete("/deleteUser", checkTokenAdmin, deleteUserController);
router.get('/getSearchUser', checkTokenAdmin, getSearchUserController);
router.get('/getUser', checkTokenAdmin, getUserController);
router.get('/getAdmin', checkTokenAdmin, getAdminController);
module.exports = router;