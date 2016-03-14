var Promise = require('bluebird');
var httpClient = require('superagent');
var fs = require('fs');
var recipient = require('./lib/recipient');
var remittance = require('./lib/remittance');
var vendor = require('./lib/vendor');
var pjson = require('./package.json');

function Rebit(opts) {
  if (!opts.token) {
    throw new Error('MissingAPIToken');
  }
  this.token = opts.token;
  this.vendorToken = opts.vendorToken;
  this.apiEndpoint = !opts.apiEndpoint ? 'https://rebit.ph/api/v1/' : opts.apiEndpoint;
  this.userAgent = !opts.userAgent ? pjson.name + "-" + pjson.version : opts.userAgent;
}//Rebit

Rebit.prototype = {
  recipient: recipient,
  remittance: remittance,
  vendor : vendor,
  user: function (user) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      if (user) {//TODO: confirm if update user doesnt work
        // httpClient.post(_this.apiEndpoint + 'user')
        //   .set('User-Agent', _this.userAgent)
        //   .send({'token': _this.token})
        //   .send(user)
        //   .end(function(err, res) {
        //     if (err) {
        //       return reject(err);
        //     }
        //     resolve(res.body);
        //   });
      } else {
        httpClient.get(_this.apiEndpoint + 'user')
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
  },//end user
  rates: function(currency) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      if (currency) {
        httpClient.get(_this.apiEndpoint + 'rates')
          .set('User-Agent', _this.userAgent)
          .query({token: _this.token})
          .send(currency)
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
  },//end rates
  schedule: function() {
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
  },//end schedule
  strategies: function() {
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
  },//end strategies
  provinces: function() {
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
  },//end provinces
  provincesByRegion: function() {
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
  }//end provincesByRegion
}//end Rebit.prototype
module.exports = Rebit;
