const userModel = require('../models/userModel');
const generateGUID = require('../resources/generateGUID');
const generateAccessToken = require('../resources/generateToken');

async function signUp(req, res) {
	try {
		console.log('[/sign-up]');

		const { nome, email, senha, telefones } = req.body;

		// verificações básicas
		if(!nome || !email || !senha || !telefones ) {
			res.status(401).send({
				"mensagem": "Preencha todos os campos."
			})

			return;
		}

		// verificar se o email já está cadastrado
		const userFound = await userModel.getUserByEmail(email);

		console.log(`userFound = ${JSON.stringify(userFound)}`);

		if(userFound) { // email já está cadastrado
			res.status(400).send({
				"mensagem": "E-mail já existente"
			})

			return;
		}

		// gerar GUID
		const generatedId = generateGUID();

		// gerar jwt
		const generatedToken = generateAccessToken(email);

		// pegar hora/data atual
		const currentDateAndTime = new Date();
		console.log(`currentDateAndTime = ${currentDateAndTime}`);

		// salvar os dados
		const userInfo = {
			"id": generatedId,
			nome,
			email,
			senha,
			telefones,
			"data_criacao": currentDateAndTime,
			"data_atualizacao": currentDateAndTime,
			"ultimo_login": currentDateAndTime,
			"token": generatedToken
		}

		await userModel.createDbUser(userInfo);

		res.status(200).send({
			"id": generatedId,
			"data_criacao": currentDateAndTime,
			"data_atualizacao": currentDateAndTime,
			"ultimo_login": currentDateAndTime,
			"token": generatedToken
		});

	} catch (error) {
		res.status(500).send({
			'mensagem': error
		});

		return
	}
}

async function signIn(req, res) {
	try {

		// TODO: verificar se o email está cadastrado
		// if () { // email não cadastrado
		// 	res.status(400).send({
		// 		"mensagem": "Usuário e/ou senha inválidos"
		// 	})
		// }

		// TODO: verificar se a senha está correta
		// if () { // senha incorreta
		// 	res.status(401).send({
		// 		"mensagem": "Usuário e/ou senha inválidos"
		// 	})
		// }

		// TODO: recuperar dados

		// pegar hora/data atual para atualizar último login
		const currentDateAndTime = Date.now();

		res.status(200).send({
			"id": "",
			"data_criacao": "",
			"data_atualizacao": "",
			"ultimo_login": currentDateAndTime,
			"token": ""
		})
		
	} catch (error) {
		res.status(500).send({
			'mensagem': error
		});
	}
}

async function getUser(req, res) {
	try {
		// recuperar token do header (Requisição: Header Authentication com valor "Bearer {token}")

		// TODO: validar token
		// if () { // token inválido
		// 	res.status(401).send({
		// 		"mensagem": "Não autorizado"
		// 	})
		// }

		// if () { // token expirado
		// 	res.status(403).send({
		// 		"mensagem": "Sessão inválida"
		// 	})
		// }
		
		// TODO: recuperar dados

		res.status(200).send({
			"id": "",
			"data_criacao": "",
			"data_atualizacao": "",
			"ultimo_login": "",
			"token": ""
		})

	} catch (error) {
		res.status(500).send({
			'mensagem': error
		});
	}
}

module.exports = {
	signUp,
	signIn,
	getUser
}