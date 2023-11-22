const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/api/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: 'build.js'
	},
	target: 'node'
};
