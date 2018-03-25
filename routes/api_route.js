const express = require('express');
const router = express.Router();
var fs = require('fs');


const app = express();


var aarti_list = [
	{"id": 1, "title": "Sukhakarta Dukhaharta", "text": "../resources/sukhakarta.txt"},
	{"id": 2, "title": "Durge Durghat"}
]

var aarti_hashMap = new Map();
aarti_hashMap.set(1, {"title": "Sukhakarta Dukhaharta", "text": "./resources/sukhakarta.txt"});
aarti_hashMap.set(2, {"title": "Durge Durghat", "text": "./resources/sukhakarta.txt"});


// list of aartis
router.get('/aarti/list', (req, res) => {
	res.json(aarti_list);
});

// aarti
router.get('/aarti/:id', (req, res) => {
	//res.json(aarti_hashMap.get(parseInt(req.params.id)));
	var song = ""
	fs.readFile(aarti_hashMap.get(parseInt(req.params.id)).text, 'utf8', function(err, data) {
	    if (err) throw err;
	    song = data;

	    res.json({
			title: aarti_hashMap.get(parseInt(req.params.id)).title,
			song: song
		});
	});

});




module.exports = router;
