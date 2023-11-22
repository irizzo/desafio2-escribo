require('dotenv/config');
require('../firebaseConfig');

const express = require('express');
const bodyParser = require('body-parser');

const userController = require('../controllers/userController');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.get('/api/', (req, res) => {
	res.setHeader('Content-Type', 'text/html');
	res.end('Desafio Técnico 2 - Escribo');
});

app.post('/api/sign-up', userController.signUp);
app.post('/api/sign-in', userController.signIn);
app.get('/api/get-user', userController.getUser);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
