var express = require('express');
var router = express.Router();
// Require controller modules
var upload_controller = require('../controllers/uploadController');

/* GET users listing. */
router.get('/', upload_controller.uploadImage );

module.exports = router;
