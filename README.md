# leasi desenvolvimentos

## Teste Processo Seletivo

Este projeto consiste em um sistema para encurtamento de URLs, desenvolvido com Node.js, TypeScript, e TypeORM, utilizando PostgreSQL como banco de dados. A API permite o cadastro e autenticação de usuários, encurtamento de URLs, listagem, edição, e exclusão de URLs encurtadas, além de contabilizar o número de cliques em cada URL.

## **Instalação e Configuração**

## **Como Rodar o Projeto**

1. Certifique-se de ter todas as dependências instaladas com o comando:

```bash
npm install
```

2. Inicie o servidor com o comando:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

## **Endpoints Disponíveis**

- **Autenticação:**

  - `POST /auth/register`: Registra um novo usuário. -> Ok
  - `POST /auth/login`: Autentica um usuário e retorna um token JWT. -> Ok

- **URLs:**

  - `POST /shorten/shorten-url`: Encurta uma URL Autenticado. -> Ok
  - `POST /shorten/shorten-url/public`: Encurta uma URL Autenticado. -> Ok
  - `GET /api/urls`: Lista URLs encurtadas pelo usuário autenticado com a contagem de cliques.
  - `PUT /api/urls/:id`: Atualiza a URL original de uma URL encurtada pelo usuário autenticado.
  - `DELETE /api/urls/:id`: Deleta logicamente uma URL encurtada pelo usuário autenticado.

- **Redirecionamento:**
  - `GET /:shortUrl`: Redireciona para a URL original e incrementa a contagem de cliques.

## Checklist do Projeto

## Estrutura do Banco de Dados

- [x] Construir uma estrutura de tabelas que faça sentido para o projeto usando um banco relacional.

## Endpoints

- [x] Construir endpoints para autenticação de e-mail e senha que retorna um Bearer Token.
- [x] Construir apenas um endpoint para encurtar o URL, ele deve receber um URL de origem e deve aceitar requisições com e sem autenticação, deve retornar o URL encurtado - incluindo o domínio.
- [ ] Construir endpoints que aceitam apenas requisições autenticadas:
  - [ ] Listagem de URLs encurtados pelo usuário com contabilização de cliques
  - [ ] Deletar URL encurtado
  - [ ] Atualizar a origem de um URL encurtado.
- [ ] Construir um endpoint que ao receber um URL encurtado, redirecione o usuário para o URL de origem e contabilize.

## Configuração e Ambiente

- [x] Definir o que deve e não deve ser variável de ambiente.

## Documentação

- [x] README ou CONTRIBUTING explicando como rodar o projeto.
- [x] Criar documentação OpenAPI/Swagger para a API.
