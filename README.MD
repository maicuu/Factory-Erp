<div align="center">

# 🏭 Factory ERP
### Sistema de Gestão Industrial Inteligente

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Quarkus](https://img.shields.io/badge/Quarkus-Supersonic-4695EB?style=for-the-badge&logo=quarkus&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)

<br />

> **Nota do Desenvolvedor:** Este projeto transcende o conceito de um simples CRUD. Trata-se de uma solução completa de **Planejamento de Recursos Empresariais (ERP)**, com foco em arquitetura limpa, otimização de estoque e algoritmos de sugestão de produção.

[Ver Demonstração](#) • [Reportar Bug](issues) • [Solicitar Feature](issues)

</div>

---

## 🎯 Diferenciais Técnicos e Arquitetura

Este projeto foi concebido com três pilares: **Performance**, **Confiabilidade** e **Escalabilidade**. Abaixo, os principais desafios de engenharia superados:

### 1. ☁️ Arquitetura "Cloud-Native" com Quarkus
Diferente do stack tradicional, a escolha pelo **Quarkus** trouxe vantagens competitivas reais:
- **Fast Startup:** O backend inicia em milissegundos (graças ao build-time processing).
- **Baixa Pegada de Memória:** Otimizado para rodar de forma leve em containers Docker e orquestradores como Kubernetes.
- **Hibernate Panache:** Implementação do padrão *Active Record* para uma camada de persistência fluida e legível.

### 2. 🔐 Gestão de Identidade e Banco de Dados
A modelagem de dados utiliza estratégias robustas de `GenerationType.IDENTITY` no **MySQL 8.0**. 
- **Desafio Superado:** Garanti a integridade referencial e compatibilidade total com scripts de carga inicial (`import.sql`), eliminando conflitos de sequência (`nextval`) comuns em migrações entre PostgreSQL e MySQL.

### 3. 🌐 Estratégia Híbrida de API e CORS
Para garantir segurança e facilidade no desenvolvimento (DX):
- **Ambiente Local:** Implementação de **Proxy Reverso via Vite**, eliminando "CORS Hell" durante o desenvolvimento.
- **Produção:** Configuração dinâmica via variáveis de ambiente (`VITE_API_URL`), permitindo deploy desacoplado (Frontend na Hostinger e Backend na Render/AWS).

### 4. 🧠 Algoritmo de Sugestão de Produção (RF008)
O sistema possui um "cérebro": um algoritmo matemático que analisa o estoque de matérias-primas, cruza com a engenharia dos produtos (BOM - Bill of Materials) e calcula **quais produtos são viáveis e lucrativos** para fabricação imediata.

### 5. 🛡️ Estratégia de Testes Abrangente (QA)
A qualidade foi garantida em duas camadas críticas:
- **Testes E2E (Cypress):** Simulação completa de fluxos de usuário (Cadastro -> Estoque -> Produção) para garantir que a interface responde corretamente ao backend.
- **Testes Isolados/Unitários:** Validação da lógica de negócios e dos algoritmos de cálculo no Backend (JUnit), garantindo que a sugestão de produção seja matematicamente precisa.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Backend** | ![Java](https://img.shields.io/badge/-Java%2021-ED8B00?logo=openjdk&logoColor=white) | Quarkus, Hibernate Panache, Microprofile |
| **Frontend** | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) | Vite, Axios Interceptors, Context API |
| **Estilo** | ![Tailwind](https://img.shields.io/badge/-Tailwind-38B2AC?logo=tailwind-css&logoColor=white) | Design System responsivo e moderno |
| **Banco** | ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white) | Banco de dados físico (não volátil) |
| **QA/Testes** | ![Cypress](https://img.shields.io/badge/-Cypress-17202C?logo=cypress&logoColor=white) | Testes End-to-End e Testes Unitários (JUnit) |
| **Infra** | ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white) | Docker Compose para orquestração |

---

## 🚀 Funcionalidades Principais

- [x] **Engenharia de Produto (BOM):** Cadastro complexo onde um Produto é composto por *N* Matérias-Primas com quantidades específicas (Relação N:N).
- [x] **Gestão de Estoque:** Controle em tempo real de níveis mínimos, custos unitários e alertas.
- [x] **Sugestão Inteligente:** Responde à pergunta estratégica: *"O que posso fabricar hoje com o que tenho no almoxarifado?"*
- [x] **Histórico de Produção:** Rastreabilidade total (Logs) de itens fabricados com timestamps precisos.

---

## 🧪 Qualidade e Testes

O projeto segue rigorosos padrões de qualidade. Veja como executar os testes:

### Testes End-to-End (Cypress)
Garante que o fluxo do usuário (Front + Back) funcione perfeitamente.
```bash
cd frontend
npx cypress open
# Ou para rodar em modo headless (CI/CD)
npx cypress run

Testes Unitários (Backend)
Valida as regras de negócio e cálculos matemáticos isoladamente.

Bash
cd backend
./mvnw test
⚡ Como Rodar o Projeto
Pré-requisitos
Java 21+

Node.js 18+

MySQL (Porta 3306)

1️⃣ Backend
Bash
cd backend
# O sistema criará o banco e importará os dados automaticamente
./mvnw quarkus:dev
2️⃣ Frontend
Bash
cd frontend
npm install
npm run dev
O sistema estará acessível em: http://localhost:5173

🐳 Rodando com Docker (Recomendado)
Para avaliadores e deploy rápido, suba toda a stack (Banco + API + Web) com um único comando:

Bash
docker-compose up --build
<div align="center">

Desenvolvido como Prova de Conceito (PoC) para Arquitetura Full Stack.
<br />
Feito com ☕ e código limpo.

</div>