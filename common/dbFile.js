var collection = {};

var fs = require('fs');
var Events = require('events');

class EventEmitter extends Events { };
const dbObjectEvents = new EventEmitter();
collection.dbObjectEvents = dbObjectEvents;

var path = require('path');
var jsonFilePath = path.join(__dirname + '/../backup/backupData.json');

collection.dbObject = {};
collection.isDataWriting = false;
isDataLoaded = false;

collection.isDataLoading = () => { return !isDataLoaded; }

collection.loadFromJsonFile = () => {
  const readStream = fs.createReadStream(jsonFilePath, { autoClose: true });
  readStream.on('data', chunk => { Object.assign(collection.dbObject, JSON.parse(chunk.toString())) });
  readStream.on('end', () => collection.isDataLoaded = true);
  readStream.on('error', err => console.log('error found', err));
}

collection.writeToJsonFile = () => {
  if (collection.isDataWriting)
    return;
  collection.isDataWriting = true;
  var dataToWrite = {};
  Object.assign(dataToWrite, collection.dbObject);

  const writeStream = fs.createWriteStream(jsonFilePath, { flags: 'w' });
  writeStream.write(JSON.stringify(dataToWrite), err => {
    if (err)
      console.error(err);
    collection.isDataWriting = false;
  });
  writeStream.on('finish', () => collection.isDataWriting = false);
}

dbObjectEvents.on('remove', function (key) {
  console.log('removed----------')
  if (collection.dbObject[key])
    delete collection.dbObject[key];
});

module.exports = collection;