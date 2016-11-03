#loopback-passport-jwt-standalone
This is an example of using "loopback-passport-jwt"
This README outlines the steps to create the project from scratch.

##Create basic loopback project
###Install loopback
>npm install -g strongloop
https://docs.strongloop.com/display/public/LB/Installing+StrongLoop

###Create project
Using version 2.x
>slc loopback
https://docs.strongloop.com/display/public/LB/Create+a+simple+API


##Add auth service "loopback-passport-jwt"
###Add npm dependency
>npm install loopback-passport-jwt --save

###Add models
Add to "server/model-config.json" file: sources, mixins and models
```
{
  "_meta": {
    "sources": [
      "loopback/common/models",
      "loopback/server/models",
      "../common/models",
      "./models",
      "loopback-passport-jwt/server/models"
    ],
    "mixins": [
      "loopback/common/mixins",
      "loopback/server/mixins",
      "../common/mixins",
      "./mixins",
      "loopback-passport-jwt/server/mixins"
    ]
  },
  "Authuser": {
    "dataSource": "db",
    "public": true,
    "$promise": {},
    "$resolved": true
  },
  "Login": {
    "dataSource": "db",
    "public": true,
    "$promise": {},
    "$resolved": true
  }
}
```

You can view de models on the API explorer:
http://localhost:3000/explorer/

###Config datasource.json
4 example:
```
{
  "db": {
    "name": "db",
    "connector": "memory",
    "file": "db.json"
  }
}
```


###Enable authentication on boot
4 enable authentication add to bootScripts the file:
Create file like
>loopback-passport-jwt/server/boot/authentication.js
Or add to bootScripts the file
```
bootOptions = { "appRootDir": __dirname, 
                "bootScripts" : [ "loopback-passport-jwt/server/boot/authentication.js" ] };
boot(app, bootOptions, function(err) {
```

###Add express router "loopback-passport-jwt" with your config
>var loopbackPassportJwt = require('loopback-passport-jwt');
>loopbackPassportJwt.boot(app, require('loopback-passsport-jwt-options'));

More info about config in: https://github.com/miyoda/loopback-passport-jwt#readme

###Allow access to models with public loopback API (optional)
Add to "server/model-config.json" file:
```
"ACL": {
    "dataSource": "db",
    "public": false
},
"Role": {
    "dataSource": "db",
    "public": false
}
```
4 enable access by apikey add to bootScripts the file:
>loopback-passport-jwt/server/boot/passport-role-apikey.js
This access allow call the with an apikey query parameter.
4 allow call de api from "loopback API explorer" with an apikey like access_token only add to "server/model-config.json" file:
```
"AccessToken": {
    "dataSource": "db",
    "public": false
}
```

4 enable access by apikey add to bootScripts the file:
loopback-passport-jwt/server/boot/passport-role-adminAuth.js


##TODO
see TODO of https://github.com/miyoda/loopback-passport-jwt#readme
