//Import both http and https for handling different uris
var http  = require('http');
//in order to write to filesystem we need the 'fs' lib
var fs    = require('fs');
//sharp for image manipulation
var sharp = require('sharp');
//google cloud lib
var gcs   = require('./gcloud').init;
//config file
var config   = require('../config/config.json');
//url helper
var urlHelper = require('../helpers/url');

exports.transform = (path) => {
  var urlData = urlHelper.getUrlAndTransformation(path);

  return new Promise((resolve, reject) => {
    // console.log(`${path}.jpg`);
    gcs.file(`${path.slice( 1 )}.jpg`).exists()
    .then((data) =>{
      if(data[0]){
        console.log('image exists');
        resolve(`${path}.jpg`);
      } else {
        console.log('transform image');
        //begin reading the image
        http.get( config.imageBase + urlData.url, (downloadStream) => {
          downloadStream.on('error', reject);
          transformAndSave (
            downloadStream,
            urlData.transformations,
            path
          )
          .then(resolve)
          .catch(reject);
        });
      }
    })
    .catch(reject);

  });

  function transformAndSave(downloadStream, transformation, imageUri){
    //create the resize transformations
    ////TODO change this part for other transformations
    var resizeTransform = sharp().resize(transformation[0], transformation[1]).max();
    return new Promise((resolve, reject) => {
      var outPath = `${imageUri}.jpg`;
      console.log('WRITING', outPath);
      var opts = { public: true };
      var writeStream = gcs.file(outPath).createWriteStream(opts);
      downloadStream.pipe(resizeTransform).pipe(writeStream);
      downloadStream.on('end', () => { console.log('file Downloaded') });
      writeStream.on('error', reject);
      writeStream.on('finish', () => resolve(outPath))
      resizeTransform.on('error', reject);
    });
  }
}
