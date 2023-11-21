require('dotenv/config');

const jwt = require('jsonwebtoken');

const tokenSecret = process.env.TOKEN_SECRET;

function generateAccessToken(userSecret) {
	return jwt.sign({ userSecret }, tokenSecret, { expiresIn: 60 * 30 });
}

module.exports = generateAccessToken;