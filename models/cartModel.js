const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required:true
  },
  quantity: {
    type: Number,
    default: 1,
  },

  price: {
    type: String,
    // required: true,
  },
},
{
  timestamps: true,
});

//Export the model
module.exports = mongoose.model("Cart", cartSchema);
