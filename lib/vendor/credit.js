var Promise = require('bluebird');
var httpClient = require('superagent');

function Credit(opts) {
  if (!opts.token) {
    throw new Error('MissingAPIToken');
  }
  this.token = opts.token;
  this.vendorToken = opts.vendorToken;
  this.apiEndpoint = opts.apiEndpoint;
  this.userAgent = opts.userAgent;
}

Credit.prototype.create = function() {
  var _this = this;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    }
    httpClient.post(_this.apiEndpoint + 'vendors/' + _this.vendorToken + '/credits')
      .set('User-Agent', _this.userAgent)
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
}

Credit.prototype.get = function(creditId) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    } else if (!creditId) {
      return reject(new Error('MissingRequiredParameter'));
    }
    httpClient.get(_this.apiEndpoint +'vendors/' + _this.vendorToken + '/credits/' + creditId)
      .set('User-Agent', _this.userAgent)
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
}

Credit.prototype.getAll = function() {
  var _this = this;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    }
    httpClient.get(_this.apiEndpoint +'vendors/' + _this.vendorToken + '/credits/')
      .set('User-Agent', _this.userAgent)
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
}

module.exports = Credit;
