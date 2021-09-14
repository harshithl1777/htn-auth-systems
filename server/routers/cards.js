const express = require('express');
const { cards } = require('../database/database');

const router = express.Router();

router.get('/:userID', (req, res) => {
	const userCards = cards.filter((card) => card.userID === req.params.userID);
	res.status(200).send({ payload: userCards[0], success: true });
});

module.exports = router;
