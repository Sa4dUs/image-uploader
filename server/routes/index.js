var express = require("express")
var router = express.Router()
const multer = require("multer")
const uuidv4 = require("uuid").v4

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/uploads")
	},
	filename: function (req, file, cb) {
		cb(null, uuidv4()+".png")
	},
})

const upload = multer({ storage: storage })

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" })
})

/* POST upload page. */
router.post("/upload", upload.single("image"), async (req, res) => {
	res.json({ path: req.file.path })
})

module.exports = router