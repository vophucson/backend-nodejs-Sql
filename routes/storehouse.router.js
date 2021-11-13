const { checkQuantityController, updateQuantityController } = require('../Controller/storehouse.controller');
const router = require("express").Router();
const { checkTokenAdmin, checkToken } = require("../auth/token_validation");

router.get('/checkQuantity', checkTokenAdmin, checkQuantityController);
router.patch('/updateQuantity', checkTokenAdmin, updateQuantityController);
module.exports = router;