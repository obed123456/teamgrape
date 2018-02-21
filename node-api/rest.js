var mysql = require('mysql');

function REST_ROUTER(router,connection,md5) {
  var self = this;
  self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
  router.get("/",function(req,res){
      res.json({"Message" : "Connected with api!"});
  });

//Adding users in databas
//POST request
router.post("/users",function(req,res){
    var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
    var table = ["users","user_name","email","pwd",req.body.user_name,req.body.email,req.body.pwd];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "User added in mysql!"});
        }
    });
});

//get one user
router.get("/getusers/:username",function(req,res){
    var query = "SELECT * FROM ?? WHERE ??=?";
    var table = ["users", "user_name", req.params.username];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "Success", "Users" : rows});
        }
    });
  });

  //Insert new markers in db
  router.post("/markers",function(req,res){
    var query = "INSERT INTO ??(??,??) VALUES (?,?)";
    var table = ["latlng","marker_lat","marker_lng",req.body.lat,req.body.lng];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "Marker added in mysql!"});
        }
    });
});


//get all markers? 

router.get("/getmarkers",function(req,res){
    var query = "SELECT * FROM ??";
    var table = ["latlng"];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "Success", "Users" : rows});
        }
    });
  });

//get one marker by id from databas

router.get("/getmarkers/:user_id", function(req,res){
  var query = "SELECT * FROM ?? WHERE ??=?";
  var table = ["latlng","id",req.params.user_id];
  query = mysql.format(query,table);
  connection.query(query,function(err,rows){
      if(err) {
          res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
          res.json({"Error" : false, "Message" : "Success", "Users" : rows});
      }
  });
});


//PUT request to change lat and lng

router.put("/changelatlng",function(req,res){
  var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
  var table = ["latlng","marker_lat",req.body.lat, "marker_lng",req.body.lng, "id",req.body.id];
  query = mysql.format(query,table);
  connection.query(query,function(err,rows){
      if(err) {
          res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
          res.json({"Error" : false, "Message" : "Lat and lat are updated for marker id:  "+ req.body.id});
      }
  });
});



//Delete markers by id 

router.delete("/deletemarker/:id",function(req,res){
  var query = "DELETE from ?? WHERE ??=?";
  var table = ["latlng","id",req.params.id];
  query = mysql.format(query,table);
  connection.query(query,function(err,rows){
      if(err) {
          res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
          res.json({"Error" : false, "Message" : "Deleted marker id:  "+ req.params.id});
      }
  });
});

//Start match 

router.post("/startmatch/:user_name", function(req,res){
    var query = "INSERT INTO ??(??) VALUES (?)";
    var table = ["match","uname",req.params.user_name];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "Success", "Users" : rows});
        }
    });
  });


  //update score in a match

  router.put("/updatematch",function(req,res){
    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    var table = ["match","correct_answer",req.body.answer, "ID",req.body.id];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "match score of ID:  "+ req.body.id + " updated."});
        }
    });
  });


  //get one match id by username

  router.get("/getmatchid/:user_name", function(req,res){
    var query = "SELECT * FROM ?? WHERE ??=?";
    var table = ["match","uname",req.params.user_name];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "Success", "Users" : rows});
        }
    });
  });


}




module.exports = REST_ROUTER;






