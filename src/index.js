require('dotenv/config');
require('./firebaseConfig');

const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController')

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.status(200).send({
		"mensagem": "início"
	});
});

app.post('/sign-up', userController.signUp);
app.post('/sign-in', userController.signIn);
app.get('/get-user', userController.getUser);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});