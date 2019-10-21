const path = require('path');
const { loadConfig } = require('../utils/loader');

const serviceCloudPath = '/etc/vietduc/config-service.json';
const serviceLocalPath = path.join(process.cwd(), 'src/config/config-service.json');
const serviceCfg = loadConfig(serviceCloudPath, serviceLocalPath);

module.exports = {
  serviceCfg
};
