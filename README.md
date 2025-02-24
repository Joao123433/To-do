# 📦 To-do List

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
yarn  # Instala todas as dependencias
cp .env.example .env  # Configurar variáveis de ambiente
docker-compose up -d
yarn drizzle-kit generate
yarn drizzle-kit migrate
yarn seed
yarn dev
```

Isso iniciará a o server.

### 5️⃣ Configurar o Frontend

```sh
cd client
yarn  # Instala todas as dependencias
yarn dev
```

Acesse a aplicação em `http://localhost:5173`.

## 🔗 API Endpoints

| Método | Rota                   | Descrição                         |
| ------ | ---------------------- | --------------------------------- |
| GET    | /tasks                 | Lista todas as tarefas            |
| POST   | /tasks                 | Cria uma nova tarefa              |
| GET    | /tasks/\:id            | Obtém detalhes de uma tarefa      |
| PUT    | /tasks/\:id            | Atualiza uma tarefa               |
| DELETE | /tasks/\:id            | Remove uma tarefa                 |
| GET    | /tasks/high-priority   | Lista tarefas de alta prioridade  |
| GET    | /tasks/next-7-days     | Lista tarefas dos próximos 7 dias |
| GET    | /tasks/status/\:status | Lista tarefas por status          |
| GET    | /priorities            | Lista todas as prioridades        |
| GET    | /status                | Lista todos os status             |

# 🖥️ Backend

## 📂 Estrutura do Backend

```
/server
│── src/
│   ├── app/
│   │   ├── function/                  # Funções que manipulam os dados das tarefas
│   │   │   ├── create-task.ts          # Criação de uma nova tarefa
│   │   │   ├── delete-task.ts          # Exclusão de uma tarefa
│   │   │   ├── get-all-priorities.ts   # Recupera todas as prioridades
│   │   │   ├── get-all-status.ts       # Recupera todos os status
│   │   │   ├── get-all-tasks.ts        # Lista todas as tarefas
│   │   │   ├── get-high-priority-tasks.ts  # Lista tarefas de alta prioridade
│   │   │   ├── get-next-7-days-tasks.ts    # Lista tarefas dos próximos 7 dias
│   │   │   ├── get-task.ts             # Obtém detalhes de uma tarefa específica
│   │   │   ├── update-task.ts          # Atualiza uma tarefa existente
│   ├── db/
│   │   ├── schema/                     # Definições das tabelas no banco de dados
│   │   │   ├── index.ts                 # Inicializa os esquemas
│   │   │   ├── priority.ts              # Esquema da tabela de prioridades
│   │   │   ├── status.ts                # Esquema da tabela de status
│   │   │   ├── task.ts                  # Esquema da tabela de tarefas
│   │   ├── index.ts                     # Conexão com o banco de dados
│   │   ├── seed.ts                      # População inicial do banco de dados
│   ├── http/
│   │   ├── routes/                      # Rotas da API
│   │   │   ├── create-task.ts           # Rota para criar uma tarefa
│   │   │   ├── delete-task.ts           # Rota para deletar uma tarefa
│   │   │   ├── get-all-priorities.ts    # Rota para listar todas as prioridades
│   │   │   ├── get-all-status.ts        # Rota para listar todos os status
│   │   │   ├── get-all-tasks.ts         # Rota para listar todas as tarefas
│   │   │   ├── get-next-7-days-tasks.ts # Rota para listar tarefas dos próximos 7 dias
│   │   │   ├── get-task-by-status.ts    # Rota para buscar tarefas por status
│   │   │   ├── get-task.ts              # Rota para obter uma tarefa específica
│   │   │   ├── update-task.ts           # Rota para atualizar uma tarefa
│   │   ├── server.ts                    # Configuração principal do servidor Fastify
│   ├── env.ts                           # Gerenciamento das variáveis de ambiente
│── .env                                 # Variáveis de ambiente
│── .env.example                         # Exemplo de configuração das variáveis de ambiente
│── docker-compose.yml                    # Configuração do Docker para o PostgreSQL
│── package.json                          # Dependências do projeto
│── biome.json                            # Configuração do Biome
│── drizzle.config.ts                      # Configuração do Drizzle ORM
│── tsconfig.json                          # Configuração do TypeScript
│── yarn.lock                              # Dependências do Yarn
```

---

# 🎨 Frontend

## 📂 Estrutura do Frontend

```
/client
│── src/
│   ├── components/                      # Componentes reutilizáveis
│   │   ├── ModalEditTask/                # Modal de edição de tarefas
│   │   │   ├── Index.tsx
│   │   ├── ModalNewTask/                 # Modal de criação de novas tarefas
│   │   │   ├── Index.tsx
│   │   ├── RootLayout/                   # Layout principal da aplicação
│   │   │   ├── Index.tsx
│   ├── context/                          # Context API para gerenciamento de estado global
│   │   ├── TaskContext.tsx               # Contexto das tarefas
│   ├── hooks/                            # Hooks customizados
│   │   ├── UseEditTask.ts                # Hook para editar tarefas
│   │   ├── UseHighPriorityTasks.ts       # Hook para buscar tarefas de alta prioridade
│   │   ├── UseNewTask.ts                 # Hook para criar novas tarefas
│   │   ├── UseTask.ts                    # Hook para manipular uma tarefa específica
│   │   ├── UseTaskNext7Days.ts           # Hook para buscar tarefas dos próximos 7 dias
│   ├── interfaces/                       # Tipagem do TypeScript
│   │   ├── ChildrenInterface.ts
│   │   ├── ModalEditTask.ts
│   │   ├── ModalNewTask.ts
│   │   ├── PrioritiesFetch.ts
│   │   ├── StatusFetch.ts
│   │   ├── TaskDataContext.ts
│   │   ├── TaskFetch.ts
│   │   ├── TaskOmit.ts
│   ├── pages/                            # Páginas da aplicação
│   │   ├── Home/
│   │   │   ├── HighPriority.tsx          # Página de tarefas de alta prioridade
│   │   │   ├── Index.tsx                 # Página principal
│   │   │   ├── Next7Days.tsx             # Página de tarefas dos próximos 7 dias
│   ├── services/                         # Serviços para comunicação com a API
│   │   ├── api.ts                        # Configuração do Axios para requisições
│   │   ├── global.d.ts                   # Tipagem global
│   │   ├── index.css                     # Estilos globais
│   │   ├── main.tsx                      # Arquivo principal do React
│   │   ├── router.tsx                    # Configuração das rotas
│   │   ├── vite-env.d.ts                  # Configuração do Vite
│── package.json                          # Dependências do projeto
│── .gitignore                            # Arquivos ignorados pelo Git
│── biome.json                            # Configuração do Biome
│── eslint.config.js                      # Configuração do ESLint
│── package-lock.json                 
│── tsconfig.app.json                     # Configuração do TypeScript
│── tsconfig.json                         # Configuração do TypeScript
│── tsconfig.node.json                    # Configuração do TypeScript
│── vite.config.ts                        # Configuração do Vite
│── yarn.lock                             # Dependências do Yarn
```

## 🛠️ Comandos Úteis

| Comando               | Descrição                    |
|-----------------------|----------------------------|
| `docker-compose up -d` | Inicia o banco de dados    |
| `yarn dev`         | Inicia o frontend/backend  |
| `yarn build`       | Compila a aplicação        |