const {
    addToCartController,
    viewCartController,
    checkOutController,
    deleteCartController,
    viewOrderXlController,
    viewOrderGhController,
    viewOrderNhController,
    viewOrderHuyController,
    shipOrderController,
    orderHistoryController,
    orderHistoryDetailController,
    deleteOrderController
} = require("../Controller/order.controller");

const router = require("express").Router();
const { checkToken, checkTokenAdmin } = require("../auth/token_validation");


router.post("/AddToCart", checkToken, addToCartController);
router.get("/viewCart", checkToken, viewCartController);
router.patch("/checkOut", checkToken, checkOutController);
router.delete("/deleteCart", checkToken, deleteCartController);
router.get("/viewOrderXl", checkTokenAdmin, viewOrderXlController);
router.get("/viewOrderGh", checkTokenAdmin, viewOrderGhController);
router.get("/viewOrderNh", checkTokenAdmin, viewOrderNhController);
router.get("/viewOrderHuy", checkTokenAdmin, viewOrderHuyController);
router.patch("/shipOrder", checkTokenAdmin, shipOrderController);
router.get("/orderHistory", checkToken, orderHistoryController);
router.get("/orderHistoryDetail", checkToken, orderHistoryDetailController);
router.delete("/deleteOrder", checkTokenAdmin, deleteOrderController);
module.exports = router;