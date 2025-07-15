// const AWS = require("aws-sdk");
// const { v4: uuid } = require("uuid");
// const path = require("path");

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS,
//   secretAccessKey: process.env.AWS_SECRET,
//   region: process.env.AWS_REGION,
// });

// exports.uploadToS3 = async (file) => {
//   const ext = path.extname(file.originalname);
//   const key = `videos/${uuid()}${ext}`;

//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: key,
//     Body: file.buffer,
//     ContentType: file.mimetype,
//   };

//   const data = await s3.upload(params).promise();
//   return data.Location;
// };

// const AWS = require("aws-sdk");
// const { v4: uuid } = require("uuid");
// const path = require("path");

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS,
//   secretAccessKey: process.env.AWS_SECRET,
//   region: process.env.AWS_REGION,
// });

// exports.uploadToS3 = async (file) => {
//   const ext = path.extname(file.originalname);
//   const key = `videos/${uuid()}${ext}`;

//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: key,
//     Body: file.buffer,
//     ContentType: file.mimetype,
//     ACL: "public-read", // ✅ this makes it playable in the browser
//   };

//   const data = await s3.upload(params).promise();
//   return data.Location;
// };

const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");
const path = require("path");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

exports.uploadToS3 = async (file) => {
  const ext = path.extname(file.originalname);
  const key = `videos/${uuid()}${ext}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype, // ✅ important for playback
  };

  const data = await s3.upload(params).promise();
  return data.Location;
};
