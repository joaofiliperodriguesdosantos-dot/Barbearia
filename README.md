💈 Sistema Web de Agendamento para Barbearia

Sistema web desenvolvido para facilitar o gerenciamento de agendamentos de uma barbearia, permitindo que clientes consultem horários disponíveis e realizem seus agendamentos de forma rápida e organizada.

📋 Sobre o projeto

O sistema tem como objetivo digitalizar o processo de agendamento da barbearia, reduzindo conflitos de horários e facilitando o gerenciamento dos atendimentos.

Principais funcionalidades

👤 Cadastro e gerenciamento de clientes

💈 Cadastro de barbeiros

✂️ Cadastro de serviços

📅 Agendamento de horários

🕐 Consulta de horários disponíveis

🔄 Gerenciamento de agendamentos

❌ Cancelamento de agendamentos

📊 Visualização da agenda da barbearia

🔐 Sistema de autenticação de usuários

🛠️ Área administrativa

🚀 Tecnologias

As tecnologias utilizadas no projeto podem incluir:

Frontend: HTML, CSS, JavaScript / React

Backend: Node.js / Express

Banco de dados: MySQL / PostgreSQL / MongoDB

Autenticação: JWT

Controle de versão: Git e GitHub

As tecnologias podem ser alteradas de acordo com a implementação do projeto.

📁 Estrutura do projeto
barbearia-agendamento/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── package.json
│
├── database/
│   └── schema.sql
│
├── .env.example
├── .gitignore
└── README.md

⚙️ Instalação
1. Clone o repositório
git clone https://github.com/seu-usuario/barbearia-agendamento.git
cd barbearia-agendamento

2. Instale as dependências
cd backend
npm install


Caso exista um frontend separado:

cd ../frontend
npm install

3. Configure as variáveis de ambiente

Crie um arquivo .env baseado no .env.example:

PORT=3000
DATABASE_URL=sua_url_do_banco
JWT_SECRET=sua_chave_secreta

4. Configure o banco de dados

Execute as migrations ou o script SQL disponibilizado no projeto.

5. Execute o projeto

Backend:

npm run dev


Frontend:

npm run dev

👥 Tipos de usuário
Cliente

O cliente pode:

Criar uma conta;

Visualizar serviços;

Escolher um barbeiro;

Consultar horários disponíveis;

Realizar agendamentos;

Visualizar seus agendamentos;

Cancelar agendamentos.

Administrador

O administrador pode:

Gerenciar clientes;

Cadastrar e editar barbeiros;

Cadastrar serviços;

Definir horários de funcionamento;

Visualizar a agenda;

Criar, editar e cancelar agendamentos;

Gerenciar os dados da barbearia.

📅 Fluxo de agendamento
Cliente
   ↓
Escolhe o serviço
   ↓
Escolhe o barbeiro
   ↓
Escolhe a data
   ↓
Consulta horários disponíveis
   ↓
Escolhe o horário
   ↓
Confirma o agendamento
   ↓
Agendamento registrado

🔒 Segurança

O sistema deve garantir:

Senhas armazenadas de forma segura;

Autenticação dos usuários;

Autorização para rotas administrativas;

Validação dos dados enviados pelo usuário;

Proteção das informações dos clientes;

Prevenção de agendamentos duplicados.

🗃️ Entidades principais

O banco de dados pode conter as seguintes entidades:

users

customers

barbers

services

appointments

business_hours

Exemplo de relacionamento
Cliente ────────< Agendamento >──────── Barbeiro
                     │
                     │
                     ▼
                  Serviço

🧪 Testes

Para executar os testes:

npm test

📌 Melhorias futuras

Integração com WhatsApp;

Envio de lembretes automáticos;

Pagamento online;

Dashboard com estatísticas;

Histórico de atendimentos;

Avaliação dos serviços;

Sistema de cupons e descontos;

Aplicativo mobile.

📄 Licença

Este projeto está sob a licença MIT.

Desenvolvido para facilitar o gerenciamento de agendamentos e melhorar a experiência dos clientes da barbearia. 💈✂️
