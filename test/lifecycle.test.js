require("dotenv").config();
var sails = require("sails");
global.chai = require("chai");
global.should = chai.should();
// Before running any tests...
before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(10000);

  const configOverrides = sails.getRc();

  sails.lift({
    // Your Sails app's configuration files will be loaded automatically,
    // but you can also specify any other special overrides here for testing purposes.

    // For example, we might want to skip the Grunt hook,
    // and disable all logs except errors and warnings:
    ...configOverrides,
    hooks: {
      ...configOverrides.hooks,
      grunt: false
    },
    models: {
      ...configOverrides.models,
      migrate: "drop"
    },
    log: {
      ...configOverrides.log,
      level: "warn"
    },
    datastores: {
      ...configOverrides.datastores,
      default: {
        // ...(configOverrides.datastores || {}).default
      // To have the tests run against a local mysql database, for example,
      // add configuration here:  (e.g. uncomment the two lines below)
      // adapter: 'sails-postgresql',
      // url: 'postgresql://username:password@localhost:5432/databasename',
        adapter: "sails-postgresql",
        url: `${process.env.PG_TEST}`
      }
    }
  }, (err) => {
    if (err) { return done(err); }
    return done();

  });
});

// After all tests have finished...
after((done) => {

  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done);

});
