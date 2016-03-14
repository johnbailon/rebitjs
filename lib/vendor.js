var credit = ('./vendor/credit');
var user = ('./vendor/user');
var recipient = ('./vendor/recipient');
module.exports = {
  credit: credit,
  user: user,
  recipient: recipient,
  remittance: {},//end remittance
  outgoingRemittance: {}, //end outgoingRemittance
  get: function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
      if (!_this.vendorToken) {
        return reject(new Error('VendorTokenRequired'));
      }
      httpClient.get(_this.apiEndpoint + 'vendors/' + _this.vendorToken)
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
  update: function(vendor) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      if (!_this.vendorToken) {
        return reject(new Error('VendorTokenRequired'));
      }
      httpClient.post(_this.apiEndpoint + 'vendors')
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
  },//end update
}//end vendor
