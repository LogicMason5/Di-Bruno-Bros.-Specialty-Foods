const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
var fs = require('fs');


const app = express();
const api_route = require('./routes/api_route.js');

// View Engine
app.set('port', (process.env.PORT || 5000))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware - cors
app.use(cors());


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Set static path
app.use(express.static(path.join(__dirname, 'public')));



//routes
app.use('/api', api_route)



app.get('/', function(req, res){
	res.json({status: "Running"});

});



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
