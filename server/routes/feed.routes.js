const express = require("express");
const Image = require("../models/Image");

const router = express.Router();

// Random images for landing page
router.get("/", async (req, res) => {
  try {
    const images = await Image.aggregate([
      { $sample: { size: 20 } } // random 20 images
    ]);

    res.json(images);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
