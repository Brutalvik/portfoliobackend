const { GridFSBucket, ObjectId } = require("mongodb");
const client = require("./config");

const downloadFile = async (fileId, res) => {
  await client.connect();
  const db = client.db("portfolio");
  const bucket = new GridFSBucket(db, { bucketName: "files" });

  const stream = bucket.openDownloadStream(new ObjectId(fileId));
  const options = {
    "Content-Type": "application/pdf",
    "Content-Disposition": 'attachment; filename="CV-Vikram Kumar.pdf"',
  };
  res.set(options);
  stream.on("error", (error) => {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to download file" });
  });

  stream.pipe(res);
};

module.exports = downloadFile;
