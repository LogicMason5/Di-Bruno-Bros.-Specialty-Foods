const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');


const app = express();
const api_route = require('./routes/api_route.js');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Set static path
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', api_route)

// testing server
app.get('/hello', function(req, res){
	res.send('<h1> Hello there, I am working! </h1>');
});




app.listen(3000, function(){
	console.log('Server running on port 3000...');
})