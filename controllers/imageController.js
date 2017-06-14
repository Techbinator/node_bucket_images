var imageHelper = require('../helpers/image');
// var testImage = 'http://orig01.deviantart.net/92d3/f/2010/110/7/2/pla_sf_3_by_recon071.jpg';
exports.image = (req, res) => {
  res.send('main');
  // imageHelper.resizeImage(testImage, [
  //   [2000, 2000]
  // ])
  // .then((thumbnailPaths) => res.send('<img src="http://storage.googleapis.com/tudor-filipovici/output-2000x2000.jpg">'))
  // .catch((err)=>console.log(err));

}

/**
 * [Used to retrieve images without transpormations]
 * @param  {[type]} req [requested params]
 * @param  {[type]} res [response]
 * @return {[type]}     [description]
 */
exports.transformations = function(req, res){
  var path = req.path.split('/');
  var transformations = path[1];
  var url = path.splice(2).join('/');
  imageHelper.resizeImage(url, [imageHelper.processTransformations(transformations)])
  .then((thumbnailPaths) => res.send(`<img src="http://storage.googleapis.com/tudor-filipovici/${thumbnailPaths}">`))
  .catch((err)=> res.send('Error fetching file'));
}
