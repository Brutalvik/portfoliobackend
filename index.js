const express = require("express");
const app = express();
const logger = require("./logger/logger");
const cors = require("cors");

// enable CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(cors());

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logger
app.use(logger);

//User Registration
app.use("/api/users", require("./API/users/register"));

//User Login
app.use("/api/users", require("./API/users/login"));

//Upload File
app.use("/api/files", require("./API/files/fileUpload"));

//Download File
app.use("/api/files", require("./API/files/fileDownload"));

//Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
