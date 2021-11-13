const { sendReviewController, viewCommentController } = require("../Controller/review.controller");

const router = require("express").Router();
const { checkToken, checkTokenAdmin } = require("../auth/token_validation");


router.post("/sendReview", checkToken, sendReviewController);
router.get("/getReview", viewCommentController);
module.exports = router;