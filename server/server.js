'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
var bootOptions = { "appRootDir": __dirname, 
                "bootScripts" : [ "loopback-passport-jwt/server/boot/authentication.js" ]
};
boot(app, bootOptions, function(err) {
  if (err) throw err;

  var loopbackPassportJwt = require('loopback-passport-jwt');
  loopbackPassportJwt.boot(app, require('../loopback-passport-jwt-options.json'));

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
