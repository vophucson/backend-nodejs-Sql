const { getAllProduct, getProductId, viewProductDetail, searchProduct, createProductController, updateProductController, deleteProductController } = require("../Controller/product.controller");

const router = require("express").Router();
const { checkToken, checkTokenAdmin } = require("../auth/token_validation");

router.get("/GetAllProduct", getAllProduct);
router.get("/GetProductById", getProductId);
router.get("/ViewProductDetail", viewProductDetail);
router.get("/SearchProduct", searchProduct);
router.post("/createProduct", checkTokenAdmin, createProductController);
router.patch("/updateProduct", checkTokenAdmin, updateProductController);
router.delete("/deleteProduct", checkTokenAdmin, deleteProductController);
module.exports = router;