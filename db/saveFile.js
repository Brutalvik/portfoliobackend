const { GridFSBucket } = require("mongodb");
const { Readable } = require("stream");
const client = require("./config");

const saveFile = async (file) => {
  await client.connect();
  const db = client.db("portfolio");
  const bucket = new GridFSBucket(db, { bucketName: "files" });
  const stream = bucket.openUploadStream(file.originalname);
  const buffer = Readable.from(file.buffer);
  buffer.pipe(stream);
  return new Promise((resolve, reject) => {
    stream.on("finish", () => {
      resolve(stream.id.toString());
    });

    stream.on("error", (error) => {
      reject(error);
    });
  });
};

module.exports = saveFile;
