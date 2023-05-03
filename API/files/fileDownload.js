const express = require("express");
const fileDownloadRouter = express.Router();
const downloadFile = require("../../db/downloadFile");

fileDownloadRouter.get("/download", async (req, res) => {
  try {
    const id = req.query.id;
    await downloadFile(id, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to download file" });
  }
});

module.exports = fileDownloadRouter;
