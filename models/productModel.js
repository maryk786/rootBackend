const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    subtitle: {
      type: String,
    },
    // status: {
    //   type: String,
    //   enum: ["In Stock", "Out Of Stock"],
    //   default: "Out Of Stock", // Default status
    // },
    stock: {
      type: Number,
      required: true,
      default: 0, // Default value for stock
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    images: {
      type: String,
    },
    image: [
      {
        public_id: String,
        url: String,
      },
    ],
    benefits: {
      type: String,
    },
    imageList: [{ type: String }],

    sold: { type: Number, default: 0 },
    season: [
      {
        type: String,
      },
    ],
    featuredProducts: {
      type: Boolean,
      default: false,
    },
    blooming_time: String,
    soil_requirement: String,
    watering_schedule: String,
    light_requirement: String,
    scientific_name: String,
    common_name: String,
    uses: String,
  },
  { timestamps: true }
);

// Instance method to update stock status
productSchema.methods.updateStockStatus = function () {
  this.status = this.stock > 0 ? "In Stock" : "Out Of Stock";
  return this.save();
};

// Pre-save middleware to update stock status
productSchema.pre("save", function (next) {
  this.status = this.stock > 0 ? "In Stock" : "Out Of Stock";
  next();
});

//Export the model
module.exports = mongoose.model("Product", productSchema);
