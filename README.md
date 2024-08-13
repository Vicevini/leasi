# leasi desenvolvimentos

## Teste Processo Seletivo

Este projeto consiste em um sistema para encurtamento de URLs, desenvolvido com Node.js, TypeScript, e TypeORM, utilizando PostgreSQL como banco de dados. A API permite o cadastro e autenticação de usuários, encurtamento de URLs, listagem, edição, e exclusão de URLs encurtadas, além de contabilizar o número de cliques em cada URL.

## **Instalação e Configuração**

### **1. Clonar o Repositório**

Clone o repositório para a sua máquina local:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

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

  - `POST /api/auth/register`: Registra um novo usuário.
  - `POST /api/auth/login`: Autentica um usuário e retorna um token JWT.

- **URLs:**

  - `POST /api/urls/shorten`: Encurta uma URL (autenticado ou não).
  - `GET /api/urls`: Lista URLs encurtadas pelo usuário autenticado com a contagem de cliques.
  - `PUT /api/urls/:id`: Atualiza a URL original de uma URL encurtada pelo usuário autenticado.
  - `DELETE /api/urls/:id`: Deleta logicamente uma URL encurtada pelo usuário autenticado.

- **Redirecionamento:**
  - `GET /:shortUrl`: Redireciona para a URL original e incrementa a contagem de cliques.
