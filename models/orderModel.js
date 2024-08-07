const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingInfo: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
      postalCode: {
        type: Number,
        required: true,
      },
      shippingFee: {
        type: Number,
        required: true,
        default: 99,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD"],
      default: "COD",
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    orderStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Delivered"],
      default: "Pending",
    },
    totalPayment: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

// Middleware to decrease product quantity and update stock status
orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const Product = mongoose.model("Product");
    for (let item of this.orderItems) {
      let product = await Product.findById(item.product);
      product.quantity -= item.quantity;
      await product.updateStockStatus();
    }
  }
  next();
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
