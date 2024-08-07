const connectDb = require("./config/dbConnect");
const Product = require("./models/productModel");
const jsonData = require("./product.json");

// Function to insert data into MongoDB
const insertDataIntoMongoDB = async () => {
  try {
    for (const data of jsonData) {
      const existingProduct = await Product.findOne({ slug: data.slug });
      if (!existingProduct) {
        await Product.create(data);
      }
    }

    console.log("Data inserted successfully:");
  } catch (error) {
    console.error("Error inserting data into MongoDB:", error);
  }
};

module.exports = insertDataIntoMongoDB;
