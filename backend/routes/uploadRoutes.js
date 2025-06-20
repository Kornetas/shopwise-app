const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Configure multer for disk storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// POST /api/upload – accepts a single file
router.post("/", upload.single("image"), (req, res) => {
  // Respond with the file path (for the frontend)
  res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
});

module.exports = router;
