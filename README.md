# Teste-BackEnd

> Código desenvolvido como teste para a vaga de desenvolvedor Back-End na empresa Evnts!

### Utilizado no Desenvolvimento

* [NodeJs](https://nodejs.org/en/)
* [Express](https://expressjs.com/pt-br/)
* [TypeORM](https://typeorm.io/)
* [Handlebars](https://handlebarsjs.com/)
* [Nodemailer](https://nodemailer.com/about/)


## 💻 Pré-requisitos

* Para rodar e testar este projeto é bom que você instale `<Node / Insomnia / DBeaver>`

## 🚀 Instalando

Para instalar o Projeto, siga estas etapas:

Clonar Repositório:
```
git clone https://github.com/LuizClaudioVasconcellos/Teste-BackEnd.git
```

Npm:
```
npm install -g
```

Yarn:
```
yarn install
```

## ☕ Usando

Para usar o projeto, siga estas etapas:

```
npm run dev
```
OU

```
yarn dev
```

### Rotas

Restaurante:

POST - http://localhost:3333/restaurants --- Cria um novo restaurante(Perfil)

{
	"restaurantName": "Habib's",
  "email": "Habibs@gmail.com",
	"password": "123456789",
  "contactNumber": "(41) 93636-1576",
  "city": "Curitiba",
  "cuisineType": "Árabe"
}

GET - http://localhost:3333/restaurants --- Lista os restaurantes(OBS: Só lista os restaurante que tenha items registrados.)

http://localhost:3333/restaurants?city=Curitiba
http://localhost:3333/restaurants?cuisineType=arabe
http://localhost:3333/restaurants?dish_name=cosTela
http://localhost:3333/restaurants?city=Curitiba&cuisineType=arabe&dish_name=cosTela

Sessions:

POST - http://localhost:3333/auth --- Após cadastrar um novo restaurante, realize a autenticação dele e use o token gerado para poder ter acesso as outras rotas.

{
	"email": "Habibs@gmail.com",
	"password": "123456789"
}

Items:

POST - http://localhost:3333/items --- Registra um novo item. Só é possível após a realização da autenticação.

{
	"dish_name": "Fallafell",
	"price": 5.99
}

GET - http://localhost:3333/items --- Lista todos os items registrados 

GET - http://localhost:3333/items/:id --- Permiti a visualização de um item especifico atráves do id.

PUT - http://localhost:3333/items/:id --- Utilize está rota caso queira atualizar um item, não esqueça do id.

{
	"dish_name": "Fallafell do Tio Jão",
	"price": 10.99
}

PATCH - http://localhost:3333/items/food/:itemId --- Rota utilizada para adicionar uma imagem ao produto.

DELETE - http://localhost:3333/items/:id --- Deleta um item.

Profile:

GET - http://localhost:3333/profile --- Mosta as informações do usuário/restaurante que está autenticado no momento.

PUT - http://localhost:3333/profile --- Atualizar as informações do perfil do usuário. A seguir dois exemplos, um para alteração de informações e outro caso deseje alterar senha.

{
	"restaurantName": "Habib's Cachamorra",
  "email": "habibs@gmail.com",
  "cuisineType": "Fast Food"
}

ou

{
	"restaurantName": "Habib's Cachamorra",
	"email": "habibs@gmail.com",
	"old_password": "123456789",
	"password": "123456",
	"password_confirmation": "123456"
}

Passowrd:

POST - http://localhost:3333/password/forgot --- Caso esqueça a senha de usuário basta informar o e-mail e um link será gerado para realizar alteração da senha. Link acessivel atráves do console onde está rodando a aplicação.

{
	"email": "habibs@gmail.com"
}

POST - http://localhost:3333/password/reset --- Para alterar a senha basta informar o token e a nova senha. Token será gerado após clicar em Resetar minha senha. Token está na URL.

{
	"token": "0b481d6e-9689-49f6-8631-26ab11debed1",
	"password": "123456789",
	"password_confirmation": "123456789"
}

[⬆ Voltar ao topo](<a href="#top"/>)<br>
