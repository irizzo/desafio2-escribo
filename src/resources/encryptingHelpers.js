const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

function encryptString(sourceString) {
	const hash = bcrypt.hashSync(sourceString, salt);

	return hash;
}

function comparePlainAndHash(plainTextString, hashString) {
	const areEqual = bcrypt.compareSync(plainTextString, hashString); // true

	return areEqual;
}

module.exports = {
	encryptString,
	comparePlainAndHash
};
