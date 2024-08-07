const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute")
const categoryRouter = require("./routes/prodcategoryRoute");
const enqRouter = require("./routes/enqRoute");
const uploadRouter = require("./routes/uploadRoute");
const cookieParser = require("cookie-parser");
const insertDataIntoMongoDB = require("./insertData");
const morgan = require("morgan");
const cors = require("cors");

app.use(morgan("dev"));

// Handle cors
app.use(
  cors({
    origin: "*", // or specify specific origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await dbConnect(); // Connect to MongoDB
    console.log(`Server is running on port ${PORT}`);
    await insertDataIntoMongoDB(); // Insert initial data into MongoDB
  } catch (error) {
    console.error("Error starting server:", error);
  }
});
