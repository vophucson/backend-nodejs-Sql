const { getAllShipperController, shipperOrderController, shipperOrderDetailController, pickupOrderController, finishOrderController, cancelOrderController } = require('../Controller/shipper.controller');
const router = require("express").Router();
const { checkTokenAdmin, checkToken, checkTokenShipper } = require("../auth/token_validation");

router.get('/getAllShipper', checkTokenAdmin, getAllShipperController);
router.get('/shipperOrder', checkTokenShipper, shipperOrderController);
router.get('/shipperOrderDetail', checkTokenShipper, shipperOrderDetailController);
router.put('/pickupOrder', checkTokenShipper, pickupOrderController);
router.put('/finishOrder', checkTokenShipper, finishOrderController);
router.put('/cancelOrder', checkTokenShipper, cancelOrderController);
module.exports = router;