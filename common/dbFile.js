var collection = {};

var fs = require('fs');
var path = require('path');
var jsonFilePath = path.join(__dirname + '/../backup/backupData.json');

collection.dbObject = {};
collection.isDataWriting = false;
isDataLoaded = false;

collection.loadFromJsonFile = () => {
  const stream = fs.createReadStream(jsonFilePath, { autoClose: true });
  stream.on('data', chunk => { Object.assign(collection.dbObject, JSON.parse(chunk.toString())) });
  stream.on('end', () => collection.isDataLoaded = true);
  stream.on('error', err => console.log('error found', err));
}

collection.isDataLoading = () => { return !isDataLoaded; }

collection.writeToJsonFile = () => {
  if (collection.isDataWriting)
    return;

  collection.isDataWriting = true;
  var dataToWrite = Object.assign(dataToWrite, collection.dbObject);
  const stream = fs.createWriteStream(jsonFilePath, { autoClose: true });
  stream.write(dataToWrite, err => {
    console.error(err);
    collection.isDataWriting = false;
  });
  stream.on('finish', () => collection.isDataWriting = false);
}

module.exports = collection;