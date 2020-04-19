function isBigger(key1, score1, key2, score2) {
  if (score1 > score2 || (score1 == score2 && key1 > key2))
    return true;
  return false;
}

function isexist(data) {
  return Object.keys(data).length ? true : false;
}

function newNode(key, score) {
  return {
    key: key,
    priority: Math.random(),
    score: score,
    left: null,
    right: null
  };
};

function size(node) {
  return node ? node.size : 0;
};

function updateSize(node) {
  if (node)
    node.size = 1 + size(node.left) + size(node.right);
};

function split(node, score, ) {

}

function insert(key, score, data) {
  if (data) {
    if (isBigger(data.key, data.score, key, score))
      data.left = insert(key, score, data.left);
    else
      data.right = insert(key, score, data.right);
    if (data.left && data.left.priority > data.priority) {
      let x = {};
      Object.assign(x, right_rotation(data));
      data = {};
      Object.assign(data, x);
    }
    if (data.right && data.right.priority > data.priority) {
      let x = {};
      Object.assign(x, left_rotation(data));
      data = {};
      Object.assign(data, x);
    }
    console.log('after', data);
    return data;
  }
  else {
    return newNode(key, score);
  }
}

function right_rotation(r) {
  console.log('right rotation before', r);
  let x = {};
  Object.assign(x, r);
  x.left = {};
  r = r.left;
  Object.assign(x.left, r.right);
  r.right = {};
  // console.log(x, r);
  Object.assign(r.right, x);
  console.log('right rotation after', r);
  return r;
}

function left_rotation(r) {
  console.log('left rotation before', r);
  let x = {};
  Object.assign(x, r);
  x.right = {};
  //console.log(x,r);
  r = r.right;
  Object.assign(x.right, r.left);
  r.left = {};
  Object.assign(r.left, x);
  // let r = {};
  // Object.assign(r, root.right);
  // let x = {};
  // Object.assign(x, root.right.left);
  // if (r.left == null)
  //   r.left = {};
  // Object.assign(r.left, root);
  // Object.assign(root.right, x);
  // Object.assign(root, r);
  console.log('left rotation after', r);
  return root;
}


module.exports = {
  insert: insert,
  newNode: newNode,
  updateSize: updateSize
};

