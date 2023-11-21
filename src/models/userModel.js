const { db } = require('../firebaseConfig');

const usersCollectionRef = db.collection('users');

async function createDbUser(userInfo) {
	console.log('[createDbUser]');

	const userRef = await usersCollectionRef.doc(userInfo.id).set(userInfo);

	return userRef;
}

async function getUserByEmail(userEmail) {
	console.log('[getUserByEmail]');
	const usersFound = [];

	const snapshot = await usersCollectionRef.where('email', '==', userEmail).get();

	if (snapshot.empty) {
		return false;
	}

	snapshot.forEach((doc) => {
		usersFound.push(doc.data());
	});

	return usersFound[0];
}

async function singInUpdate(userId, updatedInfo) {
	console.log('[singInUpdate]');

	const userRef = usersCollectionRef.doc(userId);

	const result = await userRef.update({
		data_atualizacao: updatedInfo.data_atualizacao,
		ultimo_login: updatedInfo.ultimo_login,
		token: updatedInfo.token
	});

	return result;
}

async function getUserByToken(userToken) {
	console.log('[getUserByToken]');
	const usersFound = [];

	const snapshot = await usersCollectionRef.where('token', '==', userToken).get();

	if (snapshot.empty) {
		return false;
	}

	snapshot.forEach((doc) => {
		usersFound.push(doc.data());
	});

	return usersFound[0];
}

module.exports = {
	createDbUser,
	getUserByEmail,
	singInUpdate,
	getUserByToken
};
