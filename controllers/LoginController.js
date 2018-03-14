var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "matrix",
  database: "nodedb"
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE nodedb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });
// con.connect(function(err) {
//   if (err) throw err;
//   //console.log("Connected!");
//   //var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255))";
//   var sql = "INSERT INTO users (username, password) VALUES ('admin', 'admin')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

var LoginController = {

	index : function(request, response) {
		response.render('login/index');
	},

	check : function(request, response) {

		var username = request.body.username;
		var password = request.body.password;
		var sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
		con.query(sql, [username, password], function (err, result) {
		  if (err) throw err;
		  if(result.length>0){
		  	response.writeHead(302, {
			  'Location': '/dashboard'
			});
			response.end();
		  }
		});
	},
}

module.exports =  LoginController;

