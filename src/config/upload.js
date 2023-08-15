const multer = require("multer");
const path = require("path");

const tmpFolder = path.resolve(__dirname, "..");

const uploadFolder = path.resolve(tmpFolder, "images");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

module.exports = { tmpFolder, uploadFolder, storage };
