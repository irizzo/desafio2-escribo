const userModel = require('../models/userModel');
const generateGUID = require('../resources/generateGUID');
const tokenHelpers = require('../resources/tokenHelpers');
const encryptingHelpers = require('../resources/encryptingHelpers');

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

		// pegar hora/data atual
		const currentDateAndTime = new Date();

		// encriptar a senha
		const encryptedPass = encryptingHelpers.encryptString(senha);

		// gerar jwt
		const generatedToken = tokenHelpers.generateAccessToken(email);
		// encriptar o token gerado
		const encryptedToken = encryptingHelpers.encryptString(generatedToken);

		// salvar os dados
		const userInfo = {
			id: generatedId,
			nome,
			email,
			senha: encryptedPass,
			telefones,
			data_criacao: currentDateAndTime,
			data_atualizacao: currentDateAndTime,
			ultimo_login: currentDateAndTime,
			token: encryptedToken
		};

		await userModel.createDbUser(userInfo);

		res.status(200).send({
			id: generatedId,
			data_criacao: currentDateAndTime.toString(),
			data_atualizacao: currentDateAndTime.toString(),
			ultimo_login: currentDateAndTime.toString(),
			token: encryptedToken
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
			return;
		}

		// verificar se a senha está correta
		if (!encryptingHelpers.comparePlainAndHash(senha, userFound.senha)) { // senha incorreta
			res.status(401).send({
				mensagem: 'Senha inválida'
			});
			return;
		}

		// pegar hora/data atual para atualizar último login
		const currentDateAndTime = new Date();

		// gerar jwt
		const generatedToken = tokenHelpers.generateAccessToken(email);
		const encryptedToken = encryptingHelpers.encryptString(generatedToken);

		await userModel.singInUpdate(userFound.id, {
			data_atualizacao: currentDateAndTime,
			ultimo_login: currentDateAndTime,
			token: encryptedToken
		});

		res.status(200).send({
			id: userFound.id,
			data_criacao: Date(userFound.data_criacao).toString(),
			data_atualizacao: currentDateAndTime.toString(),
			ultimo_login: currentDateAndTime.toString(),
			token: encryptedToken
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

		// validar token
		const isTokenValid = tokenHelpers.validateToken(token);

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
