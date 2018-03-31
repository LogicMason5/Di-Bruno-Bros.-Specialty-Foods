const express = require('express');
const router = express.Router();
var fs = require('fs');
const util = require('util');


const app = express();
var menu =[
	{"id":0, "title": "Aarti"},
	{"id":1, "title": "Gajar"},
	{"id":2, "title": "Sholk"}
]
var aarti_list = [
	{"id": 0, "title": "Sukhakarta Dukhaharta", "text": "sukhakarta.txt", "audio": "aarti/1-sukhakarta-dukhaharta.mp3", "catergory_id": 0},
	{"id": 1, "title": "Lavthavti Vikrala", "text": "lavthavti_vikrala.txt", "audio": "aarti/2-lavthavti-vikrala.mp3", "catergory_id": 0},
	{"id": 2, "title": "Ashthavinayak", "text": "ashthavinayak.txt", "audio": "gajar/1-ashthavinayak.mp3", "catergory_id": 1},
	{"id": 3, "title": "Moraya Moraya", "text": "sukhakarta.txt", "audio": "aarti/1-sukhakarta-dukhaharta.mp3", "catergory_id": 2},
	{"id": 4, "title": "Devadi deva", "text": "lavthavti_vikrala.txt", "audio": "aarti/2-lavthavti-vikrala.mp3", "catergory_id": 2}
];


var aarti_hashMap = new Map();
for(var i=0; i<aarti_list.length; i++){
	aarti_hashMap.set(aarti_list[i].id, aarti_list[i])
}






// list of menu
router.get('/menu/list', (req, res) => {
	res.json(menu);
});

// list of aartis
router.get('/menu/list/:id', (req, res) => {
	var songList = [];
	for(var i=0; i<aarti_list.length; i++){
		var song = aarti_hashMap.get(i);
		if(song.catergory_id == parseInt(req.params.id)){
			songList.push(song);
		}
	}
	res.json(songList);
});

// aarti
router.get('/song/:id', (req, res) => {
	//res.json(aarti_hashMap.get(parseInt(req.params.id)));
	var song = ""
	fs.readFile("./resources/text/"+aarti_hashMap.get(parseInt(req.params.id)).text, 'utf8', function(err, data) {
	    if (err) throw err;
	    song = data;

	    res.json({
				id: aarti_hashMap.get(parseInt(req.params.id)).id,
				title: aarti_hashMap.get(parseInt(req.params.id)).title,
				catergory_id: aarti_hashMap.get(parseInt(req.params.id)).catergory_id,
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
