const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

const studentrouter = require("../BackEnd-DenturedesignStudio/Routes/Studentroute.js")
const assessorrouter = require("../BackEnd-DenturedesignStudio/Routes/Assessorroute.js")
const adminrouter = require("../BackEnd-DenturedesignStudio/Routes/Adminroute.js")
app.use("/student",studentrouter)
app.use("/assessor",assessorrouter)
app.use("/admin",adminrouter)

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("mongodb connection success");  
});

app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`);
});
