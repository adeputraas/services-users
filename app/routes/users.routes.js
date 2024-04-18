const validate = require("../modules/Auth.js").isAuthenticated;
const path = require("path");
const multer = require("multer");

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads")); // Uploads will be stored in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    // Generate a unique filename by adding a timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// Initialize multer with the storage settings
const upload = multer({ storage: storage });

module.exports = (app) => {
  const user = require("../controllers/users.controller.js");

  var router = require("express").Router();

  router.post("/signin", user.Login);
  router.post("/create-users", validate, upload.single('photo'), user.createUser);
  router.post("/update-profil-users", validate, upload.single('photo'), user.updateUser);
  router.get("/retrieve-detail-user/:idUser",validate, user.findOne);
  router.get("/retrieve-all-user", validate, user.findAll);
  router.post("/delete-users/:idUser", validate, user.deleteUser);

  app.use("/", router);
};
