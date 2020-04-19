let common = require('./common');
let constant = require('./constant');

function getDataType(key) {
  let result = common.dbFile.getKey(key);
  if (result['tree'])
    return constant.DATA_TYPE.orderdSet;
  if (result.value instanceof Set)
    return constant.DATA_TYPE.set;
  if (Array.isArray(result.value))
    return constant.DATA_TYPE.list;
  if (typeof result.value === 'object')
    return constant.DATA_TYPE.hash;
  return constant.DATA_TYPE.string;
}

module.exports = {
  getDataType
};