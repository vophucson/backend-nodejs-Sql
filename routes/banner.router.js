const { createBannerController, AllBannerController, deleteBannerController, updateBannerController } = require("../Controller/banner.controller");

const router = require("express").Router();
const { checkToken, checkTokenAdmin } = require("../auth/token_validation");


router.post("/createBanner", checkTokenAdmin, createBannerController);
router.get('/getAllBanner', AllBannerController);
router.delete('/deleteBanner', checkTokenAdmin, deleteBannerController);
router.patch('/updateBanner', checkTokenAdmin, updateBannerController);

module.exports = router;