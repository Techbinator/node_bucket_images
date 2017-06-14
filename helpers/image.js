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
    httpLib.get( getImageBase() + imageUri, (downloadStream) => {
      downloadStream.on('error', reject);
      Promise.all(
        sizes.map((size)=>resizeAndSave(downloadStream, size, imageUri))
      )
      .then(resolve)
      .catch(reject);
    });
  });

  function resizeAndSave(downloadStream, size, imageUri){
    //create the resize transformations
    var resizeTransform = sharp().resize(size[0], size[1]).max();
    return new Promise((resolve, reject) => {
      var outPath = `${imageUri}-${ size[0] }x${ size[1] }.jpg`;
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

  function getImageBase(){
    return 'http://media-cdn.holidaycheck.com/';
  }

}

exports.processTransformations = (transformations) => {
  var transfArray = transformations.split(',');
  var dimensions = [];
  transfArray.map((transformation)=>{
    switch (transformation.slice(0,2)) {
      case 'w_':
        dimensions[0] = parseInt(transformation.slice(2));
        break;
      case 'h_':
        dimensions[1] = parseInt(transformation.slice(2));
        break;
    }
  })
  // console.log(transfArray);
  return dimensions;
}
