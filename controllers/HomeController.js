var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: "localhost",
	user: "root",
	password: "matrix",
	database: "nodedb",
    charset  : 'utf8'
  }
});
//var formidable = require('formidable');
var fs = require('fs');
var bookshelf = require('bookshelf')(knex);

var customer = bookshelf.Model.extend({
  tableName: 'customers'
});

var math = require('mathjs');


var HomeController = {

	index : function(request, response) {
		// customer.fetchAll().then(function(data){
		// 	//response.send(data);
		// 	var customerList = [];
		//     for (var i = 0; i < data.models.length; i++) {
		//     	//console.log(data.models[i].attributes);
	 //  			// Create an object to save current row's data
		//   		var customer = {
		//   			'name':data.models[i].attributes.name,
		//   			'address':data.models[i].attributes.address,
		//   			'id':data.models[i].attributes.id,
		//   			'image':data.models[i].attributes.image
		//   		}
		//   		// Add object into array
		//   		customerList.push(customer);
		//   	}
		//   	response.render('home/index', {
	 //        	lists: customerList
	 //    	});
		// });

		customer.fetchAll().then(function(data){
			
			var customerList = [];
			var totalcustomer = data.models.length;;
	        pageSize = 2;
	        pageCount = math.ceil(totalcustomer/pageSize);
	        currentPage = 1;
	        customers = [];
	        customersArrays = []; 
		    for(var i = 0; i < data.models.length; i++) {
		  		var customer = {
		  			'name':data.models[i].attributes.name,
		  			'address':data.models[i].attributes.address,
		  			'id':data.models[i].attributes.id,
		  			'image':data.models[i].attributes.image
		  		}
		  		// Add object into array
		  		customers.push(customer);
		  	}
		  	while (customers.length > 0) {
		        customersArrays.push(customers.splice(0, pageSize));
		    }
		    if (typeof request.query.page !== 'undefined') {
		        currentPage = +request.query.page;
		    }
		    customerList = customersArrays[+currentPage - 1];
		  	response.render('home/index', {
	        	lists: customerList,
	        	pageSize: pageSize,
		        totalcustomer: totalcustomer,
		        pageCount: pageCount,
		        currentPage: currentPage
	    	});
		});
		
	},
	add : function(request, response) {
		response.render('home/add');
	},
	save : function(request, response) {

		if(request.file != undefined){
	 
		 	var fileName = request.file.originalname;
			var file = "public/uploads/home/" + fileName;
			// /response.send( JSON.stringify( request.file ) );
			fs.readFile( request.file.path, function (err, data) {
			//	res.send( JSON.stringify( data ) );
		      	fs.writeFile(file, data, function (err) {
			        if( err ){
			            throw err;
		            }
		      	});
		    });
		} else {
			var fileName = '';
		}
		
		var createCustomer = {
			    name: request.body.name,
			    address: request.body.address,
			    image: fileName
		    }

	    new customer(createCustomer).save().then(function(model) {
	    	//console.log(model);
	    	response.writeHead(302, {
			  'Location': '/home-list'
			});
			response.end();
	    });
		
	},
	delete : function(request, response) {

		customer.where('id', request.params.id).destroy().then(function(destroyed) {
	        response.writeHead(302, {
			  'Location': '/home-list'
			});
			response.end();
        });
		
	},
	edit : function(request, response) {

		customer.where('id', request.params.id).fetchAll().then(function(data){

	  		var customers = {
	  			'name':data.models[0].attributes.name,
	  			'address':data.models[0].attributes.address,
	  			'id':data.models[0].attributes.id,
	  			'image':data.models[0].attributes.image
	  		}
		  	
		  	response.render('home/edit', {
	        	lists: customers
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

	    customer.where(whereclause).save(custdetails,{patch:true}).then(function(model) {
	    	//console.log(model);
	    	response.writeHead(302, {
			  'Location': '/home-list'
			});
			response.end();
	    });
				
	},
}

module.exports =  HomeController;