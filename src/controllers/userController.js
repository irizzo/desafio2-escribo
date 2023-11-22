const userModel = require('../models/userModel');
const generateGUID = require('../resources/generateGUID');
const tokenHelpers = require('../resources/tokenHelpers');

async function signUp(req, res) {
	try {
		console.log('[/sign-up]');

		const { nome, email, senha, telefones } = req.body;

		// verificações básicas
		if (!nome || !email || !senha || !telefones) {
			res.status(401).send({
				mensagem: 'Preencha todos os campos.'
			});

			return;
		}

		// verificar se o email já está cadastrado
		const userFound = await userModel.getUserByEmail(email);

		if (userFound) { // email já está cadastrado
			res.status(400).send({
				mensagem: 'E-mail já existente'
			});

			return;
		}

		// gerar GUID
		const generatedId = generateGUID();

		// gerar jwt
		const generatedToken = tokenHelpers.generateAccessToken(email);

		// pegar hora/data atual
		const currentDateAndTime = new Date();

		// salvar os dados
		const userInfo = {
			id: generatedId,
			nome,
			email,
			senha,
			telefones,
			data_criacao: currentDateAndTime,
			data_atualizacao: currentDateAndTime,
			ultimo_login: currentDateAndTime,
			token: generatedToken
		};

		await userModel.createDbUser(userInfo);

		res.status(200).send({
			id: generatedId,
			data_criacao: currentDateAndTime,
			data_atualizacao: currentDateAndTime,
			ultimo_login: currentDateAndTime,
			token: generatedToken
		});
	} catch (error) {
		res.status(500).send({
			mensagem: error
		});
	}
}

async function signIn(req, res) {
	try {
		console.log('[/sign-in]');

		const { email, senha } = req.body;

		// verificações básicas
		if (!email || !senha) {
			res.status(401).send({
				mensagem: 'Preencha todos os campos.'
			});

			return;
		}

		// verificar se o email está cadastrado
		const userFound = await userModel.getUserByEmail(email);

		if (!userFound) { // email não cadastrado
			res.status(400).send({
				mensagem: 'Usuário e/ou senha inválidos'
			});
		}

		// verificar se a senha está correta
		if (userFound.senha !== senha) { // senha incorreta
			res.status(401).send({
				mensagem: 'Usuário e/ou senha inválidos'
			});
		}

		// pegar hora/data atual para atualizar último login
		const currentDateAndTime = new Date();

		// gerar jwt
		const generatedToken = tokenHelpers.generateAccessToken(email);

		await userModel.singInUpdate(userFound.id, {
			data_atualizacao: currentDateAndTime,
			ultimo_login: currentDateAndTime,
			token: generatedToken
		});

		res.status(200).send({
			id: userFound.id,
			data_criacao: Date(userFound.data_criacao), // TODO: ajustar formato que vem do BD
			data_atualizacao: currentDateAndTime,
			ultimo_login: currentDateAndTime,
			token: generatedToken
		});
	} catch (error) {
		res.status(500).send({
			mensagem: error
		});
	}
}

async function getUser(req, res) {
	try {
		const { authentication } = req.headers;

		const token = tokenHelpers.getTokenFromAuthHeader(authentication);

		const isTokenValid = tokenHelpers.validateToken(token);

		// TODO: validar token
		if (isTokenValid === 'JsonWebTokenError') { // token inválido
			res.status(401).send({
				mensagem: 'Não autorizado'
			});
			return;
		}

		if (isTokenValid === 'TokenExpiredError') { // token expirado
			res.status(403).send({
				mensagem: 'Sessão inválida'
			});
			return;
		}

		res.status(200).send({
			mensagem: 'Token válido'
		});
	} catch (error) {
		res.status(500).send({
			mensagem: error
		});
	}
}

module.exports = {
	signUp,
	signIn,
	getUser
};
