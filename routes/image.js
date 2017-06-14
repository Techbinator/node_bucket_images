var express = require('express');
var router = express.Router();

// Require controller modules
var image_controller = require('../controllers/imageController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Error please provide image url');
});


/*
    If it has transfor parameters
    w -> width
    h -> height
    c ->
    q -> quality

 */
router.get('/w_*|h_*|c_*|q_*/:url', image_controller.transformations);

/*
 Get images without transformations
*/
router.get('*', image_controller.image);

module.exports = router;
