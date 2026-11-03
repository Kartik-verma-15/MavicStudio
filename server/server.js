
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow your local React app to connect.
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

// Keep uploaded files in memory for validation only.
// Do not use this as permanent file storage.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB maximum
    files: 1,
  },
  fileFilter: (req, file, callback) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(
        new Error("Only JPG, PNG, and WEBP images are allowed.")
      );
    }

    callback(null, true);
  },
});

// Test whether the server is running.
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Mavic Studio backend is running!",
  });
});

// Return the available styles.
app.get("/api/styles", (req, res) => {
  res.json({
    success: true,
    styles: [
      "Cinematic",
      "Anime",
      "Watercolor",
      "Retro Film",
    ],
  });
});

// Validate an uploaded photo and selected style.
app.post("/api/generate", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a photo.",
    });
  }

  const allowedStyles = [
    "Cinematic",
    "Anime",
    "Watercolor",
    "Retro Film",
  ];

  const style = req.body.style;

  if (!allowedStyles.includes(style)) {
    return res.status(400).json({
      success: false,
      message: "Please choose a valid style.",
    });
  }

  // The AI generation API will be connected here next.
  return res.status(501).json({
    success: false,
    message: "Photo received. AI generation is not connected yet.",
    filename: req.file.originalname,
    selectedStyle: style,
  });
});

// Return readable errors for upload failures.
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;

    return res.status(status).json({
      success: false,
      message:
        err.code === "LIMIT_FILE_SIZE"
          ? "Photo must be 10 MB or smaller."
          : "Invalid upload.",
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Something went wrong.",
    });
  }

  next();
});

app.listen(PORT, () => {
  console.log(`Mavic backend running at http://localhost:${PORT}`);
});
