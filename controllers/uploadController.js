var fs = require('fs');

/**
 * Used to upload images on the bucket
 * @param  {[type]} req [requested params]
 * @param  {[type]} res [response]
 * @return {[type]}     [description]
 */
exports.uploadImage = function(req, res){
  // console.log('testtt');
  // res.send('Upload');
  // var gcs = require('../helpers/gcloud').init;
  // Upload a local file to a new file to be created in your bucket.
  // gcs.upload('public/images/tmp/test.jpg', function(err, file) {
  //   if (!err) {
  //     // Streams are also supported for reading and writing files.
  //     var file = gcs.file('test.jpg');
  //     console.log(file);
  //
  //     // "zebra.jpg" is now in your bucket.
  //   } else {
  //     console.log(err);
  //   }
  // });
  //
  // // Reference an existing bucket.
// var localReadStream = fs.createReadStream('public/images/tmp/test.jpg');
// var remoteWriteStream = gcs.file('zebra.jpg').createWriteStream();
// localReadStream.pipe(remoteWriteStream)
//   .on('error', function(err) {})
//   .on('finish', function() {
//     // The file upload is complete.
//   });
}
