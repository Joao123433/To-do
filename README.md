# 📦 To-do List

Breve descrição do projeto.

## 🚀 Tecnologias

Este projeto utiliza as seguintes tecnologias:

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Fastify
- **ORM:** Drizzle ORM
- **Banco de Dados:** PostgreSQL (rodando em um container Docker)
- **Validação de Dados:** Zod
- **Requisições HTTP:** Axios

## 📂 Estrutura do Projeto

```
/project-root
│── frontend/  # Aplicação React + Tailwind
│── backend/   # API Fastify + Drizzle ORM
│── README.md  # Documentação Principal
```

## 🛠️ Como Configurar

### 1️⃣ Pré-requisitos

Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### 2️⃣ Clonar o Repositório

```sh
git clone https://github.com/Joao123433/challenge.git
cd challenge
git checkout -b minha-solucao
```

### 3️⃣ Configurar o Banco de Dados com Docker e do Backend

```sh
cd /server
yarn # Instala todas as dependencias
docker-compose up -d
cp .env.example .env  # Configurar variáveis de ambiente
yarn drizzle-kit generate
yarn drizzle-kit migrate
yarn seed
yarn dev
```

Isso iniciará a o server.

### 5️⃣ Configurar o Frontend

```sh
cd client
yarn # Instala todas as dependencias
yarn dev
```

Acesse a aplicação em `http://localhost:5173`.

## 🔗 API Endpoints

| Método | Rota        | Descrição          |
|--------|------------|--------------------|
| GET    | /task     | Lista itens        |
| POST   | /task     | Cria um item       |
| GET    | /task/:id | Obtém um item      |
| PUT    | /task/:id | Atualiza um item   |
| DELETE | /task/:id | Remove um item     |

## 🛠️ Comandos Úteis

| Comando               | Descrição                    |
|-----------------------|----------------------------|
| `docker-compose up -d` | Inicia o banco de dados    |
| `yarn dev`         | Inicia o frontend/backend  |
| `yarn build`       | Compila a aplicação        |
