function isBigger(key1, score1, key2, score2) {
  if (score1 > score2 || (score1 == score2 && key1 > key2))
    return true;
  return false;
}

function newNode(key, score) {
  return {
    key: key,
    priority: Math.random(),
    score: score,
    size: 1,
    left: null,
    right: null
  };
};

function size(n) {
  return n ? n.size : 0;
};

function updateSize(n) {
  if (n)
    n.size = 1 + size(n.left) + size(n.right);
};

function insert(key, score, data) {
  if (data) {
    if (data.key == key) {
      data.key = key;
      data.score = score;
    }
    else
      if (isBigger(data.key, data.score, key, score)) {
        if (data.left)
          insert(key, score, data.left);
        else
          data.left = newNode(key, score);
      }
      else if (isBigger(key, score, data.key, data.score)) {
        if (data.right)
          insert(key, score, data.right);
        else
          data.right = newNode(key, score);
      }
      else return;

    if (data.left && data.left.priority > data.priority) {
      let x = right_rotation(data);
      Object.assign(data, x);
    }
    if (data.right && data.right.priority > data.priority) {
      let x = left_rotation(data);
      Object.assign(data, x);
    }
    updateSize(data);
    return data;
  }
  else {
    return newNode(key, score);
  }
}

function getRank(data, key, score) {
  if (data.key == key)
    return (size(data) - size(data.right));
  if (data.score <= score)
    return 1 + size(data.left) + getRank(data.right, key, score);
  if (data.score > score)
    return getRank(data.left, key, score);
}

function getRange(key, score1, score2, dataArray) {
  if (!key)
    return dataArray;
  if (score1 < key.score)
    getRange(key.left, score1, score2, dataArray);
  if (score1 <= key.score && score2 >= key.score)
    dataArray.push({ key: key.key, score: key.score });
  if (score2 > key.score)
    getRange(key.right, score1, score2, dataArray);
  return dataArray;
}

function right_rotation(r) {
  let x = {};
  if (r) Object.assign(x, r);
  else x = r;

  r = r.left;
  if (r.right) {
    x.left = {};
    Object.assign(x.left, r.right);
  }
  else x.left = r.right;

  if (x) {
    r.right = {};
    Object.assign(r.right, x);
  }
  else r.right = x;
  return r;
}

function left_rotation(r) {
  let x = {};
  if (r) Object.assign(x, r);
  else x = r;

  r = r.right;
  if (r.left) {
    x.right = {};
    Object.assign(x.right, r.left);
  }
  else x.right = r.left;

  if (x) {
    r.left = {};
    Object.assign(r.left, x);
  }
  else r.left = x;

  return r;
}


module.exports = {
  insert,
  newNode,
  updateSize,
  getRange,
  getRank
};

