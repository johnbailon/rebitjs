var assert = require('assert');
var Rebit = require("../index");
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var nock = require('nock');
var token = process.env.REBIT_TOKEN;
var vendorToken = process.env.VENDOR_TOKEN;
chai.use(chaiAsPromised);
chai.should();

var nockRebit = nock('https://rebit.ph/api/v1/')
  .get("/provinces").query(true)
  .reply(200,[])

  .get("/recipients")
  .query(true)
  .reply(200,[])

  .get(/(.*?)/)
  .query(true)
  .reply(200,{})

  .intercept(/(.*?)/, 'DELETE')
  .reply(200)

  .intercept(/(.*?)/, 'POST')
  .reply(200)


  .persist();
  //.log(console.log);


describe('rebit', function() {
  it('should have a token set. i.e. $ REBIT_TOKEN=<token> VENDOR_TOKEN=<vendorToken> mocha', function(done) {
    if (!token || !vendorToken) {
      done(new Error("NoValidToken"));
    } else {
      done();
      var rebit = new Rebit({token: token, vendorToken: vendorToken});
      describe('rebit', function() {
        describe('#rates', function() {
          it('should return an object of rates', function() {
            return rebit.rates().should.be.an('object');
          });
          it('should return an object of rates if passed a valid parameter', function(){
            return rebit.rates('USD').should.eventually.be.an('object');
          });
        });

        describe('#schedule', function() {
          it('should return an object of schedule with more than one property', function() {
            return rebit.schedule().should.eventually.be.an('object');
          });
        });

        describe('#strategies', function() {
          it('should return an object of strategies', function() {
            return rebit.strategies().should.eventually.be.an('object');
          });
        });

        describe('#provinces', function() {
          it('should return an array of provinces', function() {
            return rebit.provinces().should.eventually.be.an('array');
          });
        });

        describe('#provincesByRegion', function() {
          it('should return an object of provinces by region', function() {
            return rebit.provincesByRegion().should.eventually.be.an('object');
          });
        });
      });

      describe('rebit.user', function() {
        describe('#me', function() {
          it('should return an object of user', function() {
            return rebit.user.me().should.eventually.be.an('object');
          });
        });
      });
      describe('rebit.recipient', function() {
        describe('#getAll', function() {
          it('should return an array of recipients', function() {
            return rebit.recipient.getAll().should.eventually.be.an("array");
          });
        });

        describe('#create', function() {
          it('should return ok', function() {
            return rebit.recipient.create({first_name: 'John', last_name: 'Dela Cruz', mobile: '639178881234'}).should.not.be.rejected;
          });
        });

        describe('#get', function() {
          it('should return an object', function() {
            return rebit.recipient.get(1).should.eventually.be.an("object");
          });
        });

        describe('#update', function() {
          it('should return ok', function() {
            return rebit.recipient.update(1,{first_name: 'John', last_name: 'Dela Cruz', mobile: '639178881234'}).should.not.be.rejected;
          });
        });

        describe('#delete', function() {
          it('should return ok', function() {
            return rebit.recipient.delete(1).should.not.be.rejected;
          });
        });
      });

      describe('rebit.remittance', function() {
        describe('#get', function() {
          it('should return an object of remittance', function() {
            return rebit.remittance.get(1).should.eventually.be.an('object');
          });
        });

        describe('#create', function() {
          it('should return an object of remittance', function() {
            return rebit.remittance.create(1,{amount: 1000.00,currency: 'PHP', strategy: 'bank', remittance_details: {bank: 'bpi'}}).should.eventually.be.an('object');
          });
        });

        describe('#delete', function() {
          it('should return ok', function() {
            return rebit.remittance.delete(1).should.not.be.rejected;
          });
        });

        //TODO: error on rebit
        // describe('#calculate', function() {
        //   it('should return an object of remittance', function() {
        //     return rebit.remittance.calculate({strategy: 'bank'}).should.eventually.be.an('object');
        //   });
        // });
      });

      describe('rebit.vendor', function() {
        describe('#get', function() {
          it('should return an object of vendor', function() {
            return rebit.vendor.get().should.eventually.be.an('object');
          });
        });

        describe('#update', function() {
          it('should return ok', function() {
            return rebit.vendor.update({name: "Rebit Secret Agents"}).should.not.be.rejected;
          });
        });
      });


    }//if
  });
});
