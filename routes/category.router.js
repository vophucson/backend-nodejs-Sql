const { getAllCategory, createCategoryController, deleteCategoryController, updateCategoryController } = require("../Controller/category.controller");

const router = require("express").Router();
const { checkToken, checkTokenAdmin } = require("../auth/token_validation");


router.get("/GetAllCategory", getAllCategory);
router.post("/createCategory", checkTokenAdmin, createCategoryController)
router.delete("/deleteCategory", checkTokenAdmin, deleteCategoryController);
router.patch("/updateCategory", checkTokenAdmin, updateCategoryController)


module.exports = router;