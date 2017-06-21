exports.getUrlAndTransformation = (path) => {
  path = path.split('/');
  return {
    url: path.splice(2).join('/'),
    transformations: processTransformations(path[1])
  }
}

processTransformations = (transformations) => {
  var transfArray = transformations.split(',');
  var dimensions = [];
  transfArray.map( (transformation) => {
    switch (transformation.slice(0,2)) {
      case 'w_':
        dimensions[0] = parseInt(transformation.slice(2));
        break;
      case 'h_':
        dimensions[1] = parseInt(transformation.slice(2));
        break;
    }
  })
  //TODO implement other transformations
  return dimensions;
}
