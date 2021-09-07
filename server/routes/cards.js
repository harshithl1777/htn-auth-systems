const express = require('express');
const router = express.Router();

const { cards } = require('../database/database');

router.get('/:userID', (req, res) => {
	const cardsByUser = cards.filter((card) => card.userID === req.params.userID);
	return res.send({ payload: cardsByUser, success: true });
});

module.exports = router;
