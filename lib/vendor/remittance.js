var Promise = require('bluebird');
var httpClient = require('superagent');

function Remittance(opts) {
  if (!opts.token) {
    throw new Error('MissingAPIToken');
  }

  this.token = opts.token;
  this.vendorToken = opts.vendorToken;
  this.apiEndpoint = opts.apiEndpoint;
  this.userAgent = opts.userAgent;
}

// Remittance.prototype = {
//
// }
module.exports = Remittance;
