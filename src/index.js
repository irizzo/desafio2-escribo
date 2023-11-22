import 'dotenv/config';
import './firebaseConfig.js';

import express, { urlencoded, json } from 'express';

import bp from 'body-parser';
const { json: _json } = bp;


import { signUp, signIn, getUser } from './controllers/userController.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(urlencoded({ extended: true }));
app.use(json()); // express
app.use(_json()); // body-parser

app.get('/', (req, res) => {
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	res.end('<h1> Desafio Técnico 2 - Escribo </h1>');
});

app.post('/api/sign-up', signUp);
app.post('/api/sign-in', signIn);
app.get('/api/get-user', getUser);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

export default app;
