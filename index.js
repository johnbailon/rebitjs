var Promise = require('bluebird');
var httpClient = require('superagent');
var pjson = require('./package.json');
var User = require('./lib/user');
var Recipient = require('./lib/recipient');
var Remittance = require('./lib/remittance');
var Vendor = require('./lib/vendor');

function Rebit(opts) {
  if (!opts.token) {
    throw new Error('MissingAPIToken');
  }
  this.token = opts.token;
  this.vendorToken = opts.vendorToken;
  this.apiEndpoint = !opts.apiEndpoint ? 'https://rebit.ph/api/v1/' : opts.apiEndpoint;
  this.userAgent = !opts.userAgent ? pjson.name + "-" + pjson.version : opts.userAgent;
  Rebit.prototype.user = new User(this);
  Rebit.prototype.recipient = new Recipient(this);
  Rebit.prototype.remittance = new Remittance(this);
  Rebit.prototype.vendor = new Vendor(this);
}

Rebit.prototype.rates = function(currency) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    if (currency) {
      httpClient.get(_this.apiEndpoint + 'rates')
        .set('User-Agent', _this.userAgent)
        .query({token: _this.token})
        .query({currency: currency})
        .end(function(err, res) {
          if (err) {
            return reject(err);
          }
          resolve(res.body);
        });
    } else {
      httpClient.get(_this.apiEndpoint + 'rates')
        .set('User-Agent', _this.userAgent)
        .query({token: _this.token})
        .end(function(err, res) {
          if (err) {
            return reject(err);
          }
          resolve(res.body);
        });
    }
  });
}

Rebit.prototype.schedule = function() {
  var _this = this;
  return new Promise(function(resolve, reject) {
    httpClient.get(_this.apiEndpoint + 'schedule')
      .set('User-Agent', _this.userAgent)
      .query({token: _this.token})
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}

Rebit.prototype.strategies = function () {
  var _this = this;
  return new Promise(function(resolve, reject) {
    httpClient.get(_this.apiEndpoint + 'strategies')
      .set('User-Agent', _this.userAgent)
      .query({token: _this.token})
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}

Rebit.prototype.provinces = function() {
  var _this = this;
  return new Promise(function(resolve, reject) {
    httpClient.get(_this.apiEndpoint + 'provinces')
      .set('User-Agent', _this.userAgent)
      .query({token: _this.token})
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}
Rebit.prototype.provincesByRegion = function() {
  var _this = this;
  return new Promise(function(resolve, reject) {
    httpClient.get(_this.apiEndpoint + 'provinces_by_region')
      .set('User-Agent', _this.userAgent)
      .query({token: _this.token})
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}

module.exports = Rebit;
