var Promise = require('bluebird');
var httpClient = require('superagent');
var Credit = require('./vendor/credit');
var User = require('./vendor/user');
var Recipient = require('./vendor/recipient');
var Remittance = require('./vendor/remittance');
var OutgoingRemittance = require('./vendor/outgoingremittance');

function Vendor(opts) {
  if (!opts.token) {
    throw new Error('MissingAPIToken');
  }
  this.token = opts.token;
  this.vendorToken = opts.vendorToken;
  this.apiEndpoint = opts.apiEndpoint;
  this.userAgent = opts.userAgent;

  Vendor.prototype.credit = new Credit(this);
  Vendor.prototype.user = new User(this);
  Vendor.prototype.recipient = new Recipient(this);
  Vendor.prototype.remittance = new Remittance(this);
  Vendor.prototype.outgoingRemittance = new OutgoingRemittance(this);
}


Vendor.prototype.get = function() {
  var _this = this;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    }
    httpClient.get(_this.apiEndpoint + 'vendors/' + _this.vendorToken)
      .set('User-Agent', _this.userAgent)
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
}

Vendor.prototype.update = function(vendor) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    }
    httpClient.post(_this.apiEndpoint + 'vendors')
      .set('User-Agent', _this.userAgent)
      .send(vendor)
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
}

module.exports = Vendor;
