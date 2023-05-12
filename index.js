const functions = require("firebase-functions");
const express = require("express");
const app = express();
const logger = require("./logger/logger");
const cors = require("cors");

app.use(cors());

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logger
app.use(logger);

//Start Server Verification
app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1>Portfolio backend server started successfully !</h1>");
});

//User Registration
app.use("/users", require("./API/users/register"));

//User Login
app.use("/users", require("./API/users/login"));

//User Logout
app.use("/users", require("./API/users/logout"));

//Upload File
app.use("/files", require("./API/files/fileUpload"));

//Download File
app.use("/files", require("./API/files/fileDownload"));

// //Listen
// const PORT = process.env.PORT || 5000;
// app.listen(PORT);

exports.api = functions.https.onRequest(app);
