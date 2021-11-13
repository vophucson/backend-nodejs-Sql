const { getShipServiceController, createShipServiceController, deleteShipServiceController, updateShipServiceController } = require("../Controller/shipservice.Controller");

const router = require("express").Router();
const { checkToken, checkTokenAdmin } = require("../auth/token_validation");

router.get("/getShipService", getShipServiceController);
router.post("/createShipService", checkTokenAdmin, createShipServiceController);
router.delete("/deleteShipService", checkTokenAdmin, deleteShipServiceController);
router.patch("/updateShipService", checkTokenAdmin, updateShipServiceController);
module.exports = router;