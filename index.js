const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const myPort = 5000; // ** CHANGE PORT **
const {MongoClient} = require('mongodb');

let url = "mongodb+srv://user:<password>@cluster0.hq0gb.mongodb.net/users?retryWrites=true&w=majority"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/getStudentsInAscendingOrder", (req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("users").find({}).toArray(function(err, result) {
          if (err) throw err;
          result.sort((a,b) => (a.Age - b.Age))
          console.log(result);
          res.send(result)
          db.close();
        });
      });
})



app.get("/getTotalMarksObtained", (req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("users").find({}).toArray(function(err, result) {
          if (err) throw err;
          let totalMarks = 0;

          result.forEach((student) => {
            totalMarks += Number(student.Marks);
          })
          console.log(result, totalMarks);
          
          res.send({"totalMarks":totalMarks})
          db.close();
        });
      });
})
var port = process.env.PORT || myPort;
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});