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
//   console.log("Connected!");
//   //var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
//   var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

var ContactController = {

	index : function(request, response) {
		con.query("SELECT * FROM customers", function (err, result, fields) {
		    if (err) throw err;
		    var customerList = [];
		    for (var i = 0; i < result.length; i++) {

	  			// Create an object to save current row's data
		  		var customer = {
		  			'name':result[i].name,
		  			'address':result[i].address,
		  			'id':result[i].id
		  		}
		  		// Add object into array
		  		customerList.push(customer);
		  	}
		  	response.render('contact/index', {
	        	lists: customerList
	    	});
		});
	},
	add : function(request, response) {
		response.render('contact/add');
	},
	save : function(request, response) {
		
		var createCustomer = {
		    name: request.body.name,
		    address: request.body.address
	    }
	   // now the createStudent is an object you can use in your database insert logic.
	    con.query('INSERT INTO customers SET ?', createCustomer, function (err, res) {
	     if (err) throw err;
	     // if there are no errors send an OK message.
		    response.writeHead(302, {
			  'Location': '/contact-list'
			});
			response.end();
	    });
		
	},
	delete : function(request, response) {
		
	    con.query('DELETE FROM customers WHERE id = ?', request.params.id, function (err, res) {
	     if (err) throw err;
	     // if there are no errors send an OK message.
		    response.writeHead(302, {
			  'Location': '/contact-list'
			});
			response.end();
	    });
		
	},
	edit : function(request, response) {

		con.query('SELECT * FROM customers WHERE id = ?', request.params.id, function (err, result, fields) {
		    if (err) throw err;
		   
	  		var customer = {
	  			'name':result[0].name,
	  			'address':result[0].address,
	  			'id':result[0].id
	  		}
		  	
		  	response.render('contact/edit', {
	        	lists: customer
	    	});
		});
				
	},
	update : function(request, response) {

		var custdetails = {
	        name: request.body.name,
	        address: request.body.address
	    },
	    whereclause = {
	        id: request.params.id
	    };

	    con.query('UPDATE customers SET ? WHERE ?', [custdetails, whereclause], function (err, res) {
	     if (err) throw err;
	     // if there are no errors send an OK message.
		    response.writeHead(302, {
			  'Location': '/contact-list'
			});
			response.end();
	    });
				
	},
}

module.exports =  ContactController;

