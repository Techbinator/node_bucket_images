//Import both http and https for handling different uris
var http  = require('http'),
    https = require('https');
//in order to write to filesystem we need the 'fs' lib
var fs    = require('fs');
//sharp for image manipulation
var sharp = require('sharp');
//google cloud lib
var gcs   = require('./gcloud').init;

exports.resizeImage = (imageUri, sizes) => {
  return new Promise((resolve, reject) => {
    var httpLib = http;
    // determine wether we need to use `http` or `https` libs
    if ( /^https/.test(imageUri) ) {
      httpLib = https;
    }
    //begin reading the image
    httpLib.get(imageUri, (downloadStream) => {
      downloadStream.on('error', reject);
      Promise.all(
        sizes.map((size)=>resizeAndSave(downloadStream, size))
      )
      .then(resolve)
      .catch(reject);
    });
  });

  function resizeAndSave(downloadStream, size){
    //create the resize transformations
    var resizeTransform = sharp().resize(size[0], size[1]).max();
    return new Promise((resolve, reject) => {
      var outPath = `output-${ size[0] }x${ size[1] }.jpg`;
      console.log('WRITING', outPath);
      var writeStream = gcs.file(outPath).createWriteStream();;
      downloadStream.pipe(resizeTransform).pipe(writeStream);
      downloadStream.on('end', () => resolve(outPath));
      writeStream.on('error', reject);
      resizeTransform.on('error', reject);
    });
  }

}
