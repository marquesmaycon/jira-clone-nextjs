# Jira Clone Next.js

Clone do Jira desenvolvido com Next.js para gerenciar workspaces, projetos, membros e tarefas em uma interface moderna de produtividade.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.1-000000?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Hono](https://img.shields.io/badge/Hono-4.x-E36002)](https://hono.dev/)
[![Appwrite](https://img.shields.io/badge/Appwrite-Backend-F02E65?logo=appwrite)](https://appwrite.io/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.x-FF4154?logo=react-query)](https://tanstack.com/query)

## Sobre

O Jira Clone Next.js é uma aplicação de gestão de projetos inspirada em ferramentas de produtividade como Jira e Linear. O projeto reúne autenticação, workspaces, membros, projetos e tarefas com diferentes visualizações para acompanhamento do fluxo de trabalho.

Ele foi desenvolvido com foco em organização de features, rotas protegidas, consumo de API type-safe, formulários validados e componentes reutilizáveis.

## Funcionalidades

- Cadastro e autenticação de usuários.
- Criação e gerenciamento de workspaces.
- Convite e entrada em workspace via código.
- Gestão de membros.
- Criação e organização de projetos.
- Cadastro de tarefas com responsável, status, data e descrição.
- Status de tarefa: backlog, todo, in progress, in review e done.
- Visualizações em tabela, calendário, kanban e gráficos.
- Upload de imagens para workspaces e projetos.
- Filtros, busca e sincronização de dados com TanStack Query.

## Stack

- **Next.js 15** com App Router.
- **React 19** e **TypeScript**.
- **Hono** para rotas de API.
- **Appwrite** para autenticação, banco e storage.
- **TanStack Query** para cache e mutations.
- **TanStack Table** para tabelas.
- **React Hook Form** e **Zod** para formulários.
- **Radix UI**, **Tailwind CSS** e **shadcn/ui** para interface.
- **React Big Calendar**, **Recharts** e **@hello-pangea/dnd** para recursos avançados de UI.

## Arquitetura

```txt
.
├── app/                 # Rotas Next.js
├── components/          # Componentes globais e UI
├── features/
│   ├── auth/
│   ├── members/
│   ├── projects/
│   ├── tasks/
│   └── workspaces/
├── hooks/
├── lib/                 # Appwrite, RPC e helpers
└── config.ts            # Variáveis públicas de integração
```

## Como executar

### Pré-requisitos

- Node.js 18 ou superior.
- npm.
- Projeto configurado no Appwrite.

### Instalação

```bash
git clone https://github.com/marquesmaycon/jira-clone-nextjs.git
cd jira-clone-nextjs
npm install
npm run dev
```

Crie um arquivo `.env.local` com as variáveis usadas em `config.ts`:

```env
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_PUBLIC_APPWRITE_DATABASE=
NEXT_PUBLIC_APPWRITE_WORKSPACES=
NEXT_PUBLIC_APPWRITE_MEMBERS=
NEXT_PUBLIC_APPWRITE_PROJECTS=
NEXT_PUBLIC_APPWRITE_TASKS=
NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET=
```

Depois acesse:

```txt
http://localhost:3000
```

## Scripts disponíveis

```bash
npm run dev       # Inicia o servidor de desenvolvimento
npm run build     # Gera build de produção
npm run start     # Inicia o build gerado
npm run lint      # Executa lint
npm run lint:fix  # Corrige problemas de lint
```

## Destaques técnicos

- Separação por domínio em `features`.
- API com Hono e validação por Zod.
- Estado remoto gerenciado com TanStack Query.
- Componentes acessíveis e reutilizáveis.
- Fluxo completo de workspace, projetos, membros e tarefas.
- Interface próxima de produto real, com múltiplas visualizações.

---

<div align="center">
  <img src="https://github.com/marquesmaycon.png" width="100px" style="border-radius: 50%"/>
  <br/>
  <strong>Maycon Marques</strong>
  <br/>
  <br/>

  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayconhenrique/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/marquesmaycon)
  [![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:mayconmarquesh@gmail.com)
</div>
