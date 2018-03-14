var fs = require('fs');
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var router = require('./route');
/* **** POST COFIGURATION **** */
app.use( bodyParser.json({limit: '50mb'}) );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({ extended: false,
   parameterLimit: 1000000,
limit: '50mb'}));

app.use(express.static(__dirname + '/public'));

var ejs = require('ejs-locals');
app.engine('ejs', ejs);
app.set('view engine', 'ejs');


// var ifaces = require('os').networkInterfaces();
// var record = '';
// for (var dev in ifaces) {
//    ifaces[dev].filter((details) => details.family === 'IPv4' && details.internal === false ? record = details.address: undefined);
// }
// console.log(record);

/* ************ set multiple routes ************ */
app.use(router);
/* ************	 End Route	*****************/
app.listen(8081);