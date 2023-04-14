const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const bookCtrl = require("../controllers/Book");
const router = express.Router();

router.get("/", bookCtrl.getAllBooks);
router.post("/:id/rating", auth, bookCtrl.ratingBook);
router.get("/bestrating", bookCtrl.bestRatingBook);
router.post("/", auth, multer, bookCtrl.createBook);
router.get("/:id", bookCtrl.getOneBook);
router.put("/:id", auth, multer, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;

