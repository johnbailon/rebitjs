module.exports = {
  create: function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
      if (!_this.vendorToken) {
        return reject(new Error('VendorTokenRequired'));
      }
      httpClient.get(_this.apiEndpoint + 'vendors/' + _this.vendorToken + '/credits')
        .set('User-Agent', _this.userAgent)
        .query({token: _this.token})
        .end(function(err, res) {
          if (err) {
            return reject(err);
          }
          resolve(res.body);
        });
      });
  },//end create
  get: function(creditId) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      if (!_this.vendorToken) {
        return reject(new Error('VendorTokenRequired'));
      } else if (!creditId) {
        return reject(new Error('MissingRequiredParameter'));
      }
      httpClient.get(_this.apiEndpoint +'vendors/' + _this.vendorToken + '/credits/' + creditId)
        .set('User-Agent', _this.userAgent)
        .query({token: _this.token})
        .end(function(err, res) {
          if (err) {
            return reject(err);
          }
          resolve(res.body);
        });
      });
  },//end get
  getAll: function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
      if (!_this.vendorToken) {
        return reject(new Error('VendorTokenRequired'));
      }
      httpClient.get(_this.apiEndpoint +'vendors/' + _this.vendorToken + '/credits/')
        .set('User-Agent', _this.userAgent)
        .query({token: _this.token})
        .end(function(err, res) {
          if (err) {
            return reject(err);
          }
          resolve(res.body);
        });
      });
  }//end getAll
}//end credit
