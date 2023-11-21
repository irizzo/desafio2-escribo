require('dotenv/config');

const jwt = require('jsonwebtoken');

const tokenSecret = process.env.TOKEN_SECRET;

function generateAccessToken(userSecret) {
	return jwt.sign({ userSecret }, tokenSecret, { expiresIn: 60 * 30 });
}

function getTokenFromAuthHeader(authHeader) {
	// header no formato "Bearer {token}"
	const splitHeader = authHeader.split(' ');

	return splitHeader[1];
}

function validateToken(token) {
	const isTokenValid = jwt.verify(token, tokenSecret, (err, decoded) => {
		if (err) {
			return err.name
		}

		return true
	})

	console.log(`isTokenValid = ${isTokenValid}`);

	return isTokenValid;
}

module.exports = {
	generateAccessToken,
	getTokenFromAuthHeader,
	validateToken,
};