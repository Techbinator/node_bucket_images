var storage = require('@google-cloud/storage');
var config = require('../config/config');

var gcs = storage({
  projectId: config.gCloud.projectId,
  keyFilename: 'config/project-cdfbca0c9e1a.json'
});

exports.init =  gcs.bucket(config.gCloud.bucket);
exports.gcs  =  gcs;
