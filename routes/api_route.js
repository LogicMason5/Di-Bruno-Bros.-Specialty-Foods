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
	{"id": 2, "title": "Durge Durghat", "text": "durge-durgahat.txt", "audio": "aarti/3-durge-durgahat.mp3", "catergory_id": 0},
	{"id": 3, "title": "Yuge Athhavis", "text": "yuge-athhavis.txt", "audio": "aarti/4-yuge-athhavis.mp3", "catergory_id": 0},
	{"id": 4, "title": "Trighunatmak Trimurti", "text": "trighunatmak-trimurti.txt", "audio": "aarti/5-trighunatmak-trimurti.mp3", "catergory_id": 0},
	{"id": 5, "title": "Nana Parimal", "text": "nana-marimal.txt", "audio": "aarti/6-nana-marimal.mp3", "catergory_id": 0},
	{"id": 6, "title": "Shendurlal Chadhao", "text": "shendurlal-chadhao.txt", "audio": "aarti/7-shendurlal-chadhao.mp3", "catergory_id": 0},
	{"id": 7, "title": "Yei Ho Vithhale", "text": "yeio-vithhale.txt", "audio": "aarti/8-yeio-vithhale.mp3", "catergory_id": 0},
	{"id": 8, "title": "Tu Sukhatarta", "text": "tu-shukhatarta.txt", "audio": "aarti/9-tu-shukhatarta.mp3", "catergory_id": 0},
	{"id": 9, "title": "Aarti Dyanaraja", "text": "aarti-dyanaraja.txt", "audio": "aarti/10-aarti-dyanaraja.mp3", "catergory_id": 0},
	{"id": 10, "title": "Aarti Saibaba", "text": "aarti-saibaba.txt", "audio": "", "catergory_id": 0},
	{"id": 11, "title": "Aarti Saprem (Vitthal)", "text": "aarti-saprem.txt", "audio": "", "catergory_id": 0},
	{"id": 12, "title": "Om Jaya Jagadhish", "text": "om-jaya-jagadhish.txt", "audio": "aarti/13-om-jaya-jagadhish.mp3", "catergory_id": 0},
	{"id": 13, "title": "Aata Swami Sukhe Nidra", "text": "aata-swami-sukhe-nidra.txt", "audio": "aarti/14-aata-swami-sukhe-nidra.mp3", "catergory_id": 0},
	{"id": 14, "title": "Dhanya Dhanya Ho", "text": "dhanya-dhanya-ho.txt", "audio": "aarti/15-dhanya-dhanya-ho.mp3", "catergory_id": 0},
	{"id": 15, "title": "Rijo Rijo", "text": "rijo-rijo.txt", "audio": "aarti/16-rijo-rijo.mp3", "catergory_id": 0},
	{"id": 16, "title": "Mujhe Sache Dilse", "text": "mujhe-sache-dilse.txt", "audio": "aarti/17-mujhe-sache-dilse.mp3", "catergory_id": 0},
	{"id": 17, "title": "Jai Jai Dindayala (Satyanarayan)", "text": "jai-jai-din-dayala.txt", "audio": "", "catergory_id": 0},
	{"id": 18, "title": "Kabhi Ram Banke", "text": "kabhi-ram-banke.txt", "audio": "aarti/19-kabhi-ram-banke.mp3", "catergory_id": 0},
	{"id": 19, "title": "Rama Rama", "text": "rama-rama-rama.txt", "audio": "aarti/20-rama-rama-rama.mp3", "catergory_id": 0},
	{"id": 20, "title": "Ganaraya Aarti Hi Tujala", "text": "ganaraya-aarti-hi-tujala.txt", "audio": "aarti/21-ganaraya-aarti-hi-tujala.mp3", "catergory_id": 0},
	{"id": 21, "title": "Shree Swami Samartha", "text": "shree-swami-samartha.txt", "audio": "aarti/22-shree-swami-samartha.mp3", "catergory_id": 0},
	{"id": 22, "title": "Tuch Sukhakarta", "text": "tuch-sukhakarta.txt", "audio": "aarti/23-tuch-sukhakarta.mp3", "catergory_id": 0},
	{"id": 23, "title": "Tula Khandyavar Gein (Sai Baba)", "text": "tula-khandyavar.txt", "audio": "", "catergory_id": 0},
	{"id": 24, "title": "Vithal Vithal Vithala", "text": "vithal-vithal-vithala.txt", "audio": "aarti/25-vithal-vithal-vithala.mp3", "catergory_id": 0},
	{"id": 25, "title": "Hari Chala Mandira", "text": "hari-chala-mandira.txt", "audio": "aarti/26-hari-chala-mandira.mp3", "catergory_id": 0},
	{"id": 26, "title": "Aarti Ramji Tumhari", "text": "aarti-ramji-tumhari.txt", "audio": "aarti/27-aarti-ramji-tumhari.mp3", "catergory_id": 0},
	{"id": 27, "title": "Dhupadipa Jhala Aata", "text": "dhupadipa-jhala-aata.txt", "audio": "aarti/28-dhupadipa-jhala-aata.mp3", "catergory_id": 0},
	{"id": 28, "title": "Shevat Goad Kari", "text": "shevat-god-kari.txt", "audio": "aarti/29-shevat-god-kari.mp3", "catergory_id": 0},
	{"id": 29, "title": "Ghalin Lotangan", "text": "ghalin-lotangan.txt", "audio": "aarti/30-ghalin-lotangan.mp3", "catergory_id": 0},
	{"id": 30, "title": "Ashthavinayak", "text": "ashthavinayak.txt", "audio": "gajar/1-ashthavinayak.mp3", "catergory_id": 1},
	{"id": 31, "title": "Moraya Moraya", "text": "sukhakarta.txt", "audio": "aarti/1-sukhakarta-dukhaharta.mp3", "catergory_id": 2},
	{"id": 32, "title": "Devadi deva", "text": "lavthavti_vikrala.txt", "audio": "aarti/2-lavthavti-vikrala.mp3", "catergory_id": 2}
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
			var songData =  aarti_hashMap.get(parseInt(req.params.id));
	    res.json({
				id: songData.id,
				title: songData.title,
				catergory_id: songData.catergory_id,
				lyrics: song,
				audio: songData.audio
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
