# Desafio Técnico 2 - Vaga Dev Backend Escribo

## Tecnologias Utilizadas

### Geral

A API foi desenvolvida em JavaScript, utilizando o framework `Express.js`, e para garantir a persistência dos dados, foi utilizado o banco de dados NoSQL `Firebase`.

### Segurança

Para implementar segurança foram utilizados: `JsonWebToken` para gerar token de sessão e `bcrypt.js` para criptografia de senha.

### Padronização do Estilo de Código

Para a padronização do estilo de código foi utilizado o `ESLint.js`;

### Gerênciamento de Dependências, Build e Hospedagem

Para gerenciamento de dependências foi utilizado o `Node.js` com o `npm (Node Package Manager)`, e para configuração e build, foi utilizado o `webpack`; Além disso, a api foi hospedada no serviço da `Vercel`.

## Links Do Projeto

* **Repositório GitHub** (<https://github.com/irizzo/desafio2-escribo>)
* **Hospedagem Vercel** (<https://desafio2-escribo.vercel.app/>)

## Utilizar a api

Para utilizar a API, há 3 rotas:

### Sign Up

* URL: <https://desafio2-escribo.vercel.app/api/sign-up>
* Body da Requisição no formato:
  
```json
	"nome": "string",
	"email": "string",
	"senha": "string",
	"telefones": [{"numero":"123456789", "ddd": "11"}],
```

### Sign In

* URL: <https://desafio2-escribo.vercel.app/api/sign-in>
* Body da Requisição no formato:
  
```json
	"email": "string",
	"senha": "string",
```

### Get User

* URL: <https://desafio2-escribo.vercel.app/api/get-user>
* Requisição: Header Authentication com valor `"Bearer {token}"`
