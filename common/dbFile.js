var collection = {};

var fs = require('fs');

var path = require('path');
var jsonFilePath = path.join(__dirname + '/../backup/backupData.json');

var dbObject = {};
var isDataWriting = false;
var isDataLoaded = false;

isDataLoading = () => { return !isDataLoaded; }

loadFromJsonFile = () => {
  fs.readFile(jsonFilePath, 'utf8', (err, chunk) => {
    if (err) throw err;
    if (chunk)
      Object.assign(dbObject, JSON.parse(chunk));
    isDataLoaded = true;
  });
  // const readStream = fs.createReadStream(jsonFilePath, { autoClose: true });
  // readStream.on('data', chunk => { Object.assign(dbObject, JSON.parse(chunk.toString())) });
  // readStream.on('end', () => isDataLoaded = true);
  // readStream.on('error', err => console.log('error found', err));
}

writeToJsonFile = () => {
  if (isDataWriting)
    return;
  isDataWriting = true;
  var dataToWrite = {};
  Object.assign(dataToWrite, dbObject);

  fs.writeFile(jsonFilePath, Buffer.from(JSON.stringify(dataToWrite)), (err) => {
    if (err) throw err;
    isDataWriting = false;
  });

  // const writeStream = fs.createWriteStream(jsonFilePath, { flags: 'w' });
  // writeStream.write(JSON.stringify(dataToWrite), err => {
  //   if (err)
  //     console.error(err);
  //   isDataWriting = false;
  // });
  // writeStream.on('finish', () => isDataWriting = false);
}

function getKey(key) {
  if (key in dbObject) {
    if ("expireAt" in dbObject[key] && new Date() > dbObject[key].expireAt) {
      delete dbObject[key];
      return false;
    }
    return dbObject[key];
  }
  return false;
}

module.exports = {
  isDataWriting,
  writeToJsonFile,
  isDataLoaded,
  loadFromJsonFile,
  isDataLoading,
  isDataWriting,
  getKey,
  dbObject
};