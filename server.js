const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

require("./database/connection");

const app = express();

app.use(express.json());
app.use(cors());

// Static Folder for Uploaded Files
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// User Routes
const userRouter = require("./routes/users.routes");

// Product Routes
const productsRouter = require("./routes/products.routes");

// Upload Routes
const uploadRouter = require("./routes/upload");

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productsRouter);
app.use("/api/v1/upload", uploadRouter);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`Server Running At PORT : ${PORT}`);
});