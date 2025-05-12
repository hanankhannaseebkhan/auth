const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
require("dotenv").config();

const app = express();
const { MONGO_URL, PORT } = process.env;

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB is connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors({
  origin: ["http://localhost:3000"], // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Important to allow cookies
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/", authRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
