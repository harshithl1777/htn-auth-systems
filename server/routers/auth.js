// TODO: Import database, express, jwt
const express = require('express');
const jwt = require('jsonwebtoken');
const { users } = require('../database/database');

const router = express.Router();
const ACCESS_EXPIRES_IN = '90000';
const REFRESH_EXPIRES_IN = '5184000000';

// TODO: Write login route
router.post('/session', (req, res) => {
	const matchingUser = users.filter(
		(user) => user.username === req.body.username && user.password === req.body.password
	);
	if (matchingUser.length === 0)
		return res.status(401).send({ payload: 'Invalid username or password', success: false });

	const tokenPayload = { userID: matchingUser[0].userID, username: matchingUser[0].username };
	const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
	const refreshToken = jwt.sign(tokenPayload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_EXPIRES_IN });

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production' ? true : false,
	});
	res.status(201).send({ payload: { accessToken }, success: true });
});

// TODO: Write refresh route
router.put('/session', (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) return res.status(400).send({ payload: 'Bad request', success: false });
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
			if (err) throw err;
			const tokenPayload = { userID: decoded.userID, username: decoded.username };
			const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
			res.status(200).send({ payload: { accessToken }, success: true });
		});
	} catch {
		res.status(401).send({ payload: 'Invalid refresh token', success: false });
	}
});

// TODO: Write logout route
router.delete('/session', (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) return res.status(400).send({ payload: 'Bad request', success: false });
	res.clearCookie('refreshToken');
	res.sendStatus(200);
});

module.exports = router;
