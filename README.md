# Rebit Javascript Client

[Rebit](https://rebit.ph) allows anyone in the world to send money to the Philippines using Bitcoin.

The term rebittance or "to rebit" was coined by the [SCI](http://sci.ph) team in 2014 _(despite some people implying they popularized it themselves :metal:)_

```bash
$ npm install rebit
```

### index.js
```javascript
var Rebit = require("rebit");
var rebit = new Rebit({token: process.env.REBIT_TOKEN});

console.dir(rebit);
```

```
$ node index.js
```

## TEST
```
$ REBIT_TOKEN=<token> VENDOR_TOKEN=<vendorToken> mocha
```

### TO DO
* implement vendor/remittances
* implement vendor/outgoing remittances
