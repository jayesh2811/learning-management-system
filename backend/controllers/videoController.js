const s3 = require("../config/s3");
const { v4: uuidv4 } = require("uuid");

const uploadVideo = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("No file uploaded");

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `videos/${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const result = await s3.upload(params).promise();
    res.json({ url: result.Location });
  } catch (err) {
    res.status(500).json({ error: "S3 Upload Failed" });
  }
};

module.exports = { uploadVideo };
