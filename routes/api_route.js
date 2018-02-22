const express = require('express');
const router = express.Router();

const app = express();

// add user
router.post('/add', (req, res) => {
	res.json({ hey: "hi"});
});

module.exports = router;