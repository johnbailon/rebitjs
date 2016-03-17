var Promise = require('bluebird');
var httpClient = require('superagent');

function User(opts) {
  if (!opts.token) {
    throw new Error('MissingAPIToken');
  }
  this.token = opts.token;
  this.vendorToken = opts.vendorToken;
  this.apiEndpoint = opts.apiEndpoint;
  this.userAgent = opts.userAgent;
}

User.prototype.me = function () {
  var _this = this;
  return new Promise(function(resolve, reject) {
    httpClient.get(_this.apiEndpoint + 'user')
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

module.exports = User;
