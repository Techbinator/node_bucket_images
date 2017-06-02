var fs = require('fs'),
    gm = require('gm'),
    request = require('request');

/**
 * [Used to retrieve images without transpormations]
 * @param  {[type]} req [requested params]
 * @param  {[type]} res [response]
 * @return {[type]}     [description]
 */
exports.image = function(req, res){
  var test = 'http://media-cdn.holidaycheck.com/ugc/images/1ee38533-f439-38e9-8ef2-41c86c1cffa7.jpg';
  // console.log(request(test));
  // gm('/tmp/ship-image-3.jpeg')
  // .resize(240, 240)
  // .write('/tmp/test.jpg', function (err) {
  //   (err) ? console.log(err) : console.log(err);
  // });
  // res.send('retrieve images without parameters')
    gm(request(test))
    .resize(353, 257)
    .write('public/images/tmp/test.jpg', function (err) {
      (err) ? console.log(err) : console.log(err);
    });
}

/**
 * [Used to retrieve images without transpormations]
 * @param  {[type]} req [requested params]
 * @param  {[type]} res [response]
 * @return {[type]}     [description]
 */
exports.transformations = function(req, res){
  res.send('retrieve images with transformations')
}

//TODO add the rest of the routes
