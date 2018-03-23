const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
var fs = require('fs');


const app = express();
const api_route = require('./routes/api_route.js');

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Set static path
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', api_route)



app.get('/', function(req, res){
	var title = "Bappa App"
	var song = ""
	fs.readFile('./resources/sukhakarta.txt', 'utf8', function(err, data) {
	    if (err) throw err;
	    song = data;

	    res.render('index', {
			title: title,
			song: song
		});
	});

});



app.listen(3000, function(){
	console.log('Server running on port 3000...');
})
