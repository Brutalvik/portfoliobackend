const express = require("express");
const fileUploadRouter = express.Router();
const multer = require("multer");
const upload = multer();
const saveFile = require("../../db/saveFile");

fileUploadRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileId = await saveFile(req.file);
    res.status(200).json({ success: true, id: fileId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to upload file" });
  }
});

module.exports = fileUploadRouter;
