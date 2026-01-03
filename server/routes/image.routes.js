const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Image = require("../models/Image");
const auth = require("../middleware/auth");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const image = await Image.create({
      imageUrl: result.secure_url,
      userId: req.user.id
    });

    res.json(image);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// Get logged-in user's images
router.get("/my", auth, async (req, res) => {
    const images = await Image.find({ userId: req.user.id });
    res.json(images);
  });
  

module.exports = router;
