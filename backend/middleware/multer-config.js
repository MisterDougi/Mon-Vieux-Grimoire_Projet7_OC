const multer = require("multer");

const MIME_TYPES = {
  "image/webp": "webp",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single("image");

/* const multer = require("multer");

const MIME_TYPES = {
  "image/webp": "webp",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
}).single("image");

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          error:
            "Fichier trop volumineux. La taille maximale autorisée est de 2 Mo.",
        });
      }
    } else if (err) {
      return res.status(500).json({ error: err });
    }
    next();
  });
}; */
