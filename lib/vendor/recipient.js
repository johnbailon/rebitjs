var Promise = require('bluebird');
var httpClient = require('superagent');

function Recipient(opts) {
  if (!opts.token) {
    throw new Error('MissingAPIToken');
  }
  this.opts = opts;
  this.token = opts.token;
  this.vendorToken = opts.vendorToken;
  this.apiEndpoint = opts.apiEndpoint;
  this.userAgent = opts.userAgent;
}

Recipient.prototype.create = function(recipient) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    } else if (!recipient.first_name || !recipient.last_name || !recipient.mobile) {
     reject(new Error('MissingRequiredParameters'));
    }
    httpClient.post(_this.apiEndpoint + 'vendors/' + _this.vendorToken + 'recipients')
      .set('User-Agent', _this.userAgent)
      .send(recipient)
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}

Recipient.prototype.get = function(recipientId) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    } else if (!recipientId) {
     reject(new Error('MissingRequiredParameter'));
    }
    httpClient.get(_this.apiEndpoint + 'vendors/' + _this.vendorToken + 'recipients/' + recipientId)
      .set('User-Agent', _this.userAgent)
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}

Recipient.prototype.getAll = function() {
  var _this = this;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    }
    httpClient.get(_this.apiEndpoint + 'vendors/' + _this.vendorToken + 'recipients')
      .set('User-Agent', _this.userAgent)
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}

Recipient.prototype.update = function(recipientId, recipient) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    } else if (!recipientId || !recipient.first_name || !recipient.last_name || !recipient.mobile) {
     reject(new Error('MissingRequiredParameters'));
    }
    httpClient.post(_this.apiEndpoint + 'vendors/' + _this.vendorToken + 'recipients/' + recipientId)
      .set('User-Agent', _this.userAgent)
      .send(recipient)
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}

Recipient.prototype.delete = function(recipientId) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    } else if (!recipientId) {
     reject(new Error('MissingRequiredParameter'));
    }
    httpClient.del(_this.apiEndpoint + 'vendors/' + _this.vendorToken + 'recipients' + '/' + recipientId)
      .set('User-Agent', _this.userAgent)
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}

module.exports = Recipient;
