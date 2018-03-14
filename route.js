var express 	= 	require('express');
var router 		=   express.Router();

var contact 	= 	require("./controllers/ContactController");
var home 		= 	require("./controllers/HomeController");
var login 		= 	require("./controllers/LoginController");

router.get("/contact-list", contact.index);
router.get("/contact-add", contact.add);
router.post("/contact-save", contact.save);
router.get("/contact-delete/:id", contact.delete);
router.get("/contact-edit/:id", contact.edit);
router.post("/contact-update/:id", contact.update);

var multer  = require('multer');
var upload =  multer({ dest: './tmp/' }); 

router.get("/home-list", home.index);
router.get("/home-add", home.add);
router.post("/home-save",upload.single('porfilepic'), home.save);
router.get("/home-delete/:id", home.delete);
router.get("/home-edit/:id", home.edit);
router.post("/home-update/:id", home.update);

router.get("/login", login.index);
router.post("/login-check", login.check);

module.exports = router;