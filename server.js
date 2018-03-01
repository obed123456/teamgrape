var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');//hashed password
var rest = require("./rest.js");
var app  = express();

//this will allow access to all website
//Its not secure way to do it. Use only in dev-inviroment.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
 });

function REST(){
    var self = this;
    self.connectMysql();
};

//MySQL connection

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host : 'us-cdbr-iron-east-05.cleardb.net',
        user : 'b1a6f0fbac4688',
        password : 'dc7a686a',
        database : 'heroku_6818da3daa3c509',

       /* host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'latlng',*/
        debug    :  true
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);
      self.startServer();
}

//Start server at port 3000
REST.prototype.startServer = function() {
      app.listen(process.env.PORT || 3000,function(){
          console.log("All right ! I am alive at Port 3000.");
      });
} 

//Error handlar incase mysql is not up and running.
REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

new REST();

