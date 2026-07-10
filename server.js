const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

require("./database/connection");

const app = express();

app.use(express.json());
app.use(cors());

const userRouter = require("./routes/users.routes");

app.use("/api/v1/user",userRouter);

const PORT = process.env.PORT || 8001;

app.listen(PORT,()=>{

    console.log(`Server Running At PORT : ${PORT}`);

});