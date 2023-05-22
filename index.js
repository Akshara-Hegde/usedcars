const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const connectDB = require("./databaseConnection/dbconnection");
// const errorHandler = require('./middlewares/errorHandler');
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.get('/',(req,res)=>{
//     res.send("welcome")
// })
console.log("index");
app.use("/api/users", require("./routes/authroutes"));
app.use("/api/car", require("./routes/route"));
// app.use(errorHandler)
app.listen(PORT, () => {
  console.log("connected to server");
});
