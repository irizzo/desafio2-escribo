const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send({
		"mesasge": "hello world"
	});
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});