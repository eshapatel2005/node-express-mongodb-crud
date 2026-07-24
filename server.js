const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

require("./database/connection");

const app = express();

app.use(express.json());
app.use(cors());

// User Routes
const userRouter = require("./routes/users.routes");

// Product Routes
const productsRouter = require("./routes/products.routes");

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productsRouter);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`Server Running At PORT : ${PORT}`);
});