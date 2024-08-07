const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  createOrder,
  getOrderById,
  checkout,
  updateOrder,
  getOrderByUserId,
  removeProductfromCart,
  deleteOrder,
  updateProductQuantity,
  getAllOrders,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/login", loginUserCtrl);
router.post("/cart", authMiddleware, userCart);

router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddleware, updatePassword);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/admin-login", loginAdmin);
router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/orderbyId/:id", authMiddleware, getOrderById);
router.get("/all-users", getallUser);
router.get("/getorderbyUser/:id", authMiddleware, getOrderByUserId);
router.get("/getallorders", authMiddleware, getAllOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);


router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductfromCart
);
router.delete("/:id", deleteaUser);

router.delete("/order/:id", authMiddleware, deleteOrder);
router.put("/order/update-order/:id", authMiddleware, isAdmin, updateOrder);
router.put("/edit-user/:id", authMiddleware, updatedUser);
router.put(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductQuantity
);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
