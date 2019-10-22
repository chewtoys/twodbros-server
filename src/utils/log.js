/* eslint-disable global-require */

const common = require('@vietduc/common');
const serviceCfg = common.getConfig('service');

module.exports = {
  info: (...args) => {
    if (serviceCfg.log_level === 'info') console.log(...args);
  },
  error: (...args) => {
    if (serviceCfg.log_level === 'error') console.error(...args);
  }
};
