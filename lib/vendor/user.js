var Promise = require('bluebird');
var httpClient = require('superagent');
var fs = require('fs');

function User(opts) {
  if (!opts.token) {
    throw new Error('MissingAPIToken');
  }
  this.opts = opts;
  this.token = opts.token;
  this.vendorToken = opts.vendorToken;
  this.apiEndpoint = !opts.apiEndpoint ? 'https://rebit.ph/api/v1/' : opts.apiEndpoint;
  this.userAgent = !opts.userAgent ? pjson.name + "-" + pjson.version : opts.userAgent;
}

User.prototype.getAll = function() {
  var _this = this.parent;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    }
    httpClient.get(_this.apiEndpoint +'vendors/' + _this.vendorToken + '/users/')
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

User.prototype.get = function(userId) {
  var _this = this.parent;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    } else if  (!userId) {
      return reject(new Error('MissingRequiredParameter'));
    }
    httpClient.get(_this.apiEndpoint +'vendors/' + _this.vendorToken + '/users/' + userId)
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

User.prototype.findByEmail = function(email) {
  var _this = this.parent;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    } else if  (!email) {
      return reject(new Error('MissingRequiredParameter'));
    }
    httpClient.get(_this.apiEndpoint +'vendors/' + _this.vendorToken + '/users/find_by_email')
      .set('User-Agent', _this.userAgent)
      .query({token: _this.token})
      .query({email: email})
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}

User.prototype.create = function(user) {
  var _this = this.parent;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    } else if  (!user.email) {
      return reject(new Error('MissingRequiredParameter'));
    }
    httpClient.post(_this.apiEndpoint +'vendors/' + _this.vendorToken + '/users')
      .set('User-Agent', _this.userAgent)
      .send({'token': _this.token})
      .send({user: user})
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}

User.prototype.instantRemit = function(user) {
  var _this = this.parent;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    } else if  (!user.email || !user.amount) {
      return reject(new Error('MissingRequiredParameters'));
    }
    httpClient.post(_this.apiEndpoint +'vendors/' + _this.vendorToken + '/users/instant_remit')
      .set('User-Agent', _this.userAgent)
      .send({'token': _this.token})
      .send(user)
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}

User.prototype.update = function(userId, user) {
  var _this = this.parent;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    } else if  (!userId || !user) {
      return reject(new Error('MissingRequiredParameter'));
    }
    httpClient.post(_this.apiEndpoint +'vendors/' + _this.vendorToken + '/users/' + userId)
      .set('User-Agent', _this.userAgent)
      .send({'token': _this.token})
      .send({user: user})
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}

User.prototype.updatePassword = function(userId, user) {
  var _this = this.parent;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    } else if  (!userId || !user.old_password || !user.password || !user.password_confirmation) {
      return reject(new Error('MissingRequiredParameter'));
    }
    httpClient.post(_this.apiEndpoint +'vendors/' + _this.vendorToken + '/users/' + userId)
      .set('User-Agent', _this.userAgent)
      .send({'token': _this.token})
      .send({user: user})
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}

User.prototype.delete = function(userId) {
  var _this = this.parent;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    } else if (!userId) {
     reject(new Error('MissingRequiredParameter'));
    }
    httpClient.del(_this.apiEndpoint + 'vendors/' + _this.vendorToken + '/users/' + userId)
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

User.prototype.upload = function(userId, file) {
  var _this = this.parent;
  return new Promise(function(resolve, reject) {
    if (!_this.vendorToken) {
      return reject(new Error('VendorTokenRequired'));
    } else if  (!userId) {
      return reject(new Error('MissingRequiredParameter'));
    }
    var attach = 'data:image/jpg;base64,' + fs.readFileSync(file,{encoding: 'base64'});
    httpClient.post(_this.apiEndpoint +'vendors/' + _this.vendorToken + '/users' + userId + '/uploads')
      .set('User-Agent', _this.userAgent)
      .send({'token': _this.token})
      .attach({file: attach})
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
}

module.exports = User;
