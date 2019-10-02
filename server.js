const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());


var con = mysql.createConnection({
	host: "instance-1.cs3qjthqb1zr.us-east-1.rds.amazonaws.com",
	user:"admin",
	password:"akash2000",
	database: "form"
});
con.connect((err) => {
	if(!err)  
	console.log('Connection succeeded');
	else
	console.log('Unsuccessful \n Error : '+JSON.stringify(err,undefined,2));
});



app.post('/items',(req,res)=>{
  	con.query("select * from items", function (err, result, fields) {
    
    if (err) 
      {
        console.log('error');
        throw err;
      }
      
    var resx=[];
      Object.keys(result).forEach(function(key) {
      	var i = result[key].item;
      	var j = result[key].cost;

      resx.push({name: i, price: j});
    });
      console.log(JSON.stringify(resx));
      res.json(JSON.stringify(resx));
  });
});



app.post('/update',(req,res)=>{
	console.log(req.body);

	con.query("delete from items", function (err, result, fields) {
    if (err) console.log(err.sqlMessage);
  	const abc={
    res:result,
    error:err
   	}
	});

	req.body.forEach(function(ele){
		con.query("insert into items values (?, ?)", [ele.name, ele.price], function (err, result, fields) {
	    if (err) console.log(err.sqlMessage);
	  	const abc={
	    res:result,
	    error:err
	   	}
	  	//res.json(JSON.stringify(abc));
  		});
	});
});



app.post('/bill',(req,res)=>{
	console.log(req.body);
	con.query("insert into bills values (?, ?)", [req.body.user, req.body.cost], function (err, result, fields) {
    if (err) console.log(err.sqlMessage);
  	const abc={
    res:result,
    error:err
   	}
  	res.json(JSON.stringify(abc));
	});
});


// app.listen(5000,()=>{
//   console.log("Port 5000");
// })

module.exports = app;