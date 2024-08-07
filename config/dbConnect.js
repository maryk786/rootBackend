const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
  // try {
  //   mongoose.set('strictQuery', false);
  //   const conn = mongoose.connect(process.env.MONGODB_URL);
  //   console.log("Database Connected Successfully");
  // } catch (error) {
  //   console.log("Database error");
  // }
};
module.exports = dbConnect;
