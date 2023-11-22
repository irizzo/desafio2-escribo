import 'dotenv/config';

// import { sign, verify } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

const tokenSecret = process.env.TOKEN_SECRET;

function generateAccessToken(userSecret) {
	return sign({ userSecret }, tokenSecret, { expiresIn: 60 * 30 });
}

function getTokenFromAuthHeader(authHeader) {
	// header no formato "Bearer {token}"
	const splitHeader = authHeader.split(' ');

	return splitHeader[1];
}

function validateToken(token) {
	const isTokenValid = verify(token, tokenSecret, (err) => {
		if (err) {
			return err.name;
		}

		return true;
	});

	return isTokenValid;
}

export default {
	generateAccessToken,
	getTokenFromAuthHeader,
	validateToken
};
