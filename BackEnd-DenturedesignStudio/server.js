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

mongoose.connect(URL);

const studentrouter = require("./Routes/Studentroute.js");
const assessorrouter = require("./Routes/Assessorroute.js");
const adminrouter = require("./Routes/Adminroute.js");
const progressrouter = require("./Routes/Progressroute.js");
const lecturerouter = require("./Routes/Lectureroute.js");
const actualcaserouter = require("./Routes/Actualcaseroute.js");
const cloudinarySignatureRoute = require("./Routes/cloudinarySignature.js");

app.use("/student", studentrouter);
app.use("/assessor", assessorrouter);
app.use("/admin", adminrouter);
app.use("/progress", progressrouter);
app.use("/lecture", lecturerouter);
app.use("/actualcase", actualcaserouter);
app.use("/api/cloudinary-signature", cloudinarySignatureRoute);


const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb connection success");
});

app.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
