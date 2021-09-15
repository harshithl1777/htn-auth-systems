// TODO: Import jwt
const jwt = require('jsonwebtoken');

// TODO: Write middleware function
const jwtMiddleware = (req, res, next) => {
	try {
		const accessToken = req.headers.authorization.split(' ')[1];
		if (!accessToken) return res.status(400).send({ payload: 'Bad request', success: false });
		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) throw err;
			req.userID = decoded.userID;
			req.username = decoded.username;
			next();
		});
	} catch {
		res.status(401).send({ payload: 'Invalid access token', success: false });
	}
};

module.exports = jwtMiddleware;
