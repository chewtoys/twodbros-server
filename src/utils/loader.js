/* eslint-disable global-require */

const fs = require('fs');
const path = require('path');

const requireDir = (dirPath, exceptions) => {
  const requires = [];
  for (const fileName of fs.readdirSync(dirPath)) {
    if (exceptions.includes(fileName)) continue;
    const rqur = require(path.join(dirPath, fileName));
    requires.push(rqur);
  }
  return requires;
};

module.exports.requireDir = requireDir;

const loadConfig = (cloudPath, localPath) => {
  let config = null;
  if (fs.existsSync(cloudPath)) {
    config = require(cloudPath);
  } else if (fs.existsSync(localPath)) {
    config = require(localPath);
  } else {
    console.error(new Error('Cannot find config'));
    process.exit(1);
  }
  return config;
};

module.exports.loadConfig = loadConfig;
