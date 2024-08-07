const express = require("express");
const {
  createProduct,
  getaProduct,
  getProductbyPage,
  getAllProducts,
  updateProduct,
  search,
  relatedProduct,
  deleteProduct,
  addToWishlist,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);

router.get("/:id/related", relatedProduct);
router.get("/search", search);

router.get("/pagination", getProductbyPage);
router.get("/", getAllProducts);
router.get("/:id", getaProduct);

router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
