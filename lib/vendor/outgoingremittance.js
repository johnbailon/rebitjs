var Promise = require('bluebird');
var httpClient = require('superagent');

function OutgoingRemittance(opts) {
  if (!opts.token) {
    throw new Error('MissingAPIToken');
  }
  this.token = opts.token;
  this.vendorToken = opts.vendorToken;
  this.apiEndpoint = opts.apiEndpoint;
  this.userAgent = opts.userAgent;
}

// OutgoingRemittance.prototype = {
//
// }
module.exports = OutgoingRemittance;
