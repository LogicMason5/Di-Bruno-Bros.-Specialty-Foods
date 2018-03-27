const express = require('express');
const router = express.Router();
var fs = require('fs');
const util = require('util');


const app = express();

var aarti_list = [
	{"id": 0, "title": "Sukhakarta Dukhaharta", "text": "sukhakarta.txt", "audio": "aarti/1-sukhakarta-dukhaharta.mp3", "type": "aarti"},
	{"id": 1, "title": "Lavthavti Vikrala", "text": "lavthavti_vikrala.txt", "audio": "aarti/2-lavthavti-vikrala.mp3"}
]

var aarti_hashMap = new Map();
for(var i=0; i<aarti_list.length; i++){
	aarti_hashMap.set(aarti_list[i].id, aarti_list[i])
}

// list of aartis
router.get('/aarti/list', (req, res) => {
	res.json(aarti_list);
});

// aarti
router.get('/aarti/:id', (req, res) => {
	//res.json(aarti_hashMap.get(parseInt(req.params.id)));
	var song = ""
	fs.readFile("./resources/text/"+aarti_hashMap.get(parseInt(req.params.id)).text, 'utf8', function(err, data) {
	    if (err) throw err;
	    song = data;

	    res.json({
				id: aarti_hashMap.get(parseInt(req.params.id)).id,
				title: aarti_hashMap.get(parseInt(req.params.id)).title,
				type: aarti_hashMap.get(parseInt(req.params.id)).type,
				lyrics: song
		});
	});

});


router.get('/aarti/:id/audio', (req, res) => {
	var filePath = "./resources/bappamusic/"+aarti_hashMap.get(parseInt(req.params.id)).audio;
  var stat = fs.statSync(filePath);

  res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size
  });

  var readStream = fs.createReadStream(filePath);
  // We replaced all the event handlers with a simple call to util.pump()
  readStream.pipe(res);
});



module.exports = router;
