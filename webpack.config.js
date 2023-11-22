import { join } from 'path';

export const mode = 'production';
export const entry = './src/index.js';
export const output = {
	path: join(__dirname, 'dist'),
	publicPath: '/',
	filename: 'build.js'
};
export const target = 'node';
