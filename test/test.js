var assert = require('assert');
var Rebit = require("../index");
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

describe('rebit', function() {
  it('should have a token set. i.e. REBIT_TOKEN=<token> mocha', function(done) {
    if (!process.env.REBIT_TOKEN) {
      done(new Error("NoValidToken"));
    } else {
      done();
      var rebit = new Rebit({token: process.env.REBIT_TOKEN});
      // describe('rebit', function() {
      //   describe('#rates', function () {
      //     this.timeout(5000);
      //     it('should return a Javascript object of rates from Rebit.ph', function() {
      //       return rebit.rates().should.be.an('object');
      //     });
      //     it('should return a Javascript object of rates from Rebit.ph if passed a valid parameter', function(){
      //       return rebit.rates('USD').should.eventually.have.property('USD');
      //     });
      //   });
      //
      //   describe('#schedule', function () {
      //     this.timeout(5000);
      //     it('should return a Javascript object of schedule with more than one property from Rebit.ph', function() {
      //       return rebit.schedule().should.be.an('object');
      //     });
      //   });
      //
      //   describe('#strategies', function () {
      //     this.timeout(5000);
      //     it('should return a Javascript object of strategies from Rebit.ph', function() {
      //       return rebit.strategies().should.be.an('object');
      //     });
      //   });
      //
      //   describe('#provinces', function () {
      //     this.timeout(5000);
      //     it('should return a Javascript object of provinces from Rebit.ph', function() {
      //       return rebit.provinces().should.be.an('object');
      //     });
      //   });
      //
      //   describe('#provincesByRegion', function () {
      //     this.timeout(5000);
      //     it('should return a Javascript object of provinces by region from Rebit.ph', function() {
      //       return rebit.provincesByRegion().should.be.an('object');
      //     });
      //   });
      // });

      // describe('rebit.user', function() {
      //   describe('#me', function () {
      //     this.timeout(5000);
      //     it('should return a Javascript object with a user property from Rebit.ph', function() {
      //       return rebit.user.me().should.eventually.have.property('user');
      //     });
      //   });
      // });

      // describe('rebit.recipient', function() {
      //   describe('#getAll', function () {
      //     this.timeout(5000);
      //     it('should return a Javascript object of recipients from Rebit.ph', function() {
      //       return rebit.recipient.getAll().should.be.an('object');
      //     });
      //   });
      // });

      describe('rebit.vendor', function() {
        describe('#getAll', function () {
          this.timeout(5000);
          it('should return a Javascript object of remittances from Rebit.ph', function() {
            return rebit.remittance.getAll().should.be.an('object');
          });
        });
      });


    }//if
  });
});
