/* eslint-disable global-require */

const fs = require('fs');
const path = require('path');

const cloudPath = '/etc/vietduc/config-service.json';
const localPath = path.join(process.cwd(), 'src/config/config-service.json');

let config = null;
if (fs.existsSync(cloudPath)) {
  config = require(cloudPath);
} else if (fs.existsSync(localPath)) {
  config = require(localPath);
} else {
  console.error(new Error('Cannot find config'));
  process.exit(1);
}

module.exports = {
  info: (...args) => {
    if (config.log_level === 'info') console.log(...args);
  },
  error: (...args) => {
    if (config.log_level === 'error') console.error(...args);
  }
};
