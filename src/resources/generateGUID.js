/* eslint-disable no-bitwise */
function S4() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function generateGUID() {
	console.log('[generateGUID]');
	// eslint-disable-next-line prefer-template
	return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
}

module.exports = generateGUID;
