const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "-" + Date.now() + "." + file.originalname.split(".")[1]);
	} 
});
const upload = multer({ storage: storage });

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "pug");


app.get("/", (req, res) => {
	res.render("index");
});

app.post("/get-file-size", upload.single("file"), (req, res) => {
	res.json({
		size: req.file.size
	});
});

app.listen(process.env.PORT || 3000, () => {
	console.log("App started successfully");
});