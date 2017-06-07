var imageHelper = require('../helpers/image'),
    testImage = 'http://media-cdn.holidaycheck.com/ugc/images/1ee38533-f439-38e9-8ef2-41c86c1cffa7.jpg';

exports.image = (req, res) => {
  imageHelper.resizeImage(testImage, [
    [100, 100]
  ])
  .then((thumbnailPaths) => console.log('DONE', thumbnailPaths))
  .catch((err)=>console.log(err));
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
