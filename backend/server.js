const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/db");

const app = express();
app.use(core());
app.use(express.json());

app.use("/api/auth", route("./routes/authRouter.js"));

dbConnect();

const PORT = process .env.PORT || 5000;
app.listen(PORT,() => console.log(`server ruaning on post ${PORT}`))