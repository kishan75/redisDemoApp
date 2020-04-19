var fs = require('fs');

var path = require('path');
var jsonFilePath = path.join(__dirname + '/../backup/backupData.json');

var dbObject = {};
var isDataWriting = false;
var isDataLoaded = false;

isDataLoading = () => { return !isDataLoaded; }

/* 
  function for reading JSON file 
  since it is JSON file so firstly we will fetch all data into buffer then parse it 
*/
function loadFromJsonFile() {
  fs.readFile(jsonFilePath, 'utf8', (err, chunk) => {
    if (err) throw err;
    if (chunk)
      Object.assign(dbObject, JSON.parse(chunk));
    isDataLoaded = true;
  });
}

/* 
  function for writing data into file after a fix interval 
  interval can be set from env and default value is 3 second
*/
function writeToJsonFile() {
  if (isDataWriting || !isDataLoaded)
    return;
  isDataWriting = true;
  var dataToWrite = {};
  Object.assign(dataToWrite, dbObject);
  fs.writeFile(jsonFilePath, Buffer.from(JSON.stringify(dataToWrite)), (err) => {
    if (err) throw err;
    isDataWriting = false;
  });
}

/* 
  this getKey function check that key is expired or not
*/
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