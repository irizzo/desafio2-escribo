const { db } = require('../firebaseConfig');

const usersCollectionRerf = db.collection('users');

async function createDbUser(userInfo) {
	console.log("[createDbUser]");

	const userRef = await usersCollectionRerf.doc(userInfo.id).set(userInfo);

	return userRef;
}

async function getUserByEmail(userEmail) {
	console.log('[getUserByEmail]');

	const snapshot = await usersCollectionRerf.where('email', '==', userEmail).get();

	if (snapshot.empty) {
		return false;
	}

	const queryResult = []

	snapshot.forEach(doc => {
		queryResult.push(doc.data());
	});

	return queryResult;
}

module.exports = {
	createDbUser,
	getUserByEmail
}