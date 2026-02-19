<div align="center">

# 🏭 Factory ERP
### Sistema de Gestão Industrial Inteligente

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Quarkus](https://img.shields.io/badge/Quarkus-Supersonic-4695EB?style=for-the-badge&logo=quarkus&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)

<br />

> **Nota do Desenvolvedor:** Este projeto transcende o conceito de um simples CRUD. Trata-se de uma solução completa de **Planejamento de Recursos Empresariais (ERP)**, com foco em arquitetura limpa, otimização de estoque e algoritmos de sugestão de produção.

[Ver Demonstração](https://app.lmtools.com.br/) • [Reportar Bug](https://wa.me/5588988824078?text=Ol%C3%A1%21%20Encontrei%20um%20bug%20no%20Factory%20ERP.%20O%20problema%20%C3%A9%20o%20seguinte%3A%20) • [Solicitar Feature](https://wa.me/5588988824078?text=Ol%C3%A1%21%20Tenho%20uma%20sugest%C3%A3o%20de%20nova%20funcionalidade%20para%20o%20Factory%20ERP.%20A%20minha%20ideia%20%C3%A9%3A%20)

</div>

---

## 🎯 Diferenciais Técnicos e Arquitetura

Este projeto foi concebido com três pilares: **Performance**, **Confiabilidade** e **Escalabilidade**. Abaixo, os principais desafios de engenharia superados:

### 1. ☁️ Arquitetura "Cloud-Native" com Quarkus & Java 17
Diferente do stack tradicional, a escolha pelo **Quarkus** e **Java 17 (LTS)** trouxe vantagens competitivas reais:
- **Fast Startup:** O backend inicia em milissegundos (graças ao build-time processing).
- **Baixa Pegada de Memória:** Otimizado para rodar de forma leve em containers Docker e orquestradores.
- **Hibernate Panache:** Implementação do padrão *Active Record* para uma camada de persistência fluida e legível.

### 2. 🔐 Gestão de Identidade e Banco de Dados
A modelagem de dados utiliza estratégias robustas de `GenerationType.IDENTITY` no **MySQL 8.0**. 
- **Desafio Superado:** Garanti a integridade referencial e compatibilidade total com scripts de carga inicial (`import.sql`), eliminando conflitos de sequência (`nextval`) comuns em migrações entre PostgreSQL e MySQL.

### 3. 🌐 Estratégia Híbrida de API e CORS
Para garantir segurança e facilidade no desenvolvimento (DX):
- **Ambiente Local:** Implementação de **Proxy Reverso via Vite**, eliminando "CORS Hell" durante o desenvolvimento.
- **Produção:** Configuração dinâmica via variáveis de ambiente (`VITE_API_URL`), permitindo deploy desacoplado.

### 4. 🧠 Algoritmo de Sugestão de Produção (RF008)
O sistema possui um "cérebro": um algoritmo matemático que analisa o estoque de matérias-primas, cruza com a engenharia dos produtos (BOM - Bill of Materials) e calcula **quais produtos são viáveis e lucrativos** para fabricação imediata.

### 5. 🛡️ Estratégia de Testes Abrangente (QA)
A qualidade foi garantida em duas camadas críticas:
- **Testes E2E (Cypress):** Simulação completa de fluxos de usuário (Cadastro -> Estoque -> Produção).
- **Testes Isolados/Unitários:** Validação da lógica de negócios e dos algoritmos de cálculo no Backend (JUnit), garantindo precisão matemática.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Backend** | ![Java](https://img.shields.io/badge/-Java%2017-ED8B00?logo=openjdk&logoColor=white) | Quarkus, Hibernate Panache, Microprofile |
| **Frontend** | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) | Vite, Axios Interceptors, Context API |
| **Estilo** | ![Tailwind](https://img.shields.io/badge/-Tailwind-38B2AC?logo=tailwind-css&logoColor=white) | Design System responsivo e moderno |
| **Banco** | ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white) | Banco de dados físico (MySQL 8) |
| **QA/Testes** | ![Cypress](https://img.shields.io/badge/-Cypress-17202C?logo=cypress&logoColor=white) | Testes End-to-End e Testes Unitários |

---

## 🚀 Funcionalidades Principais

- [x] **Engenharia de Produto (BOM):** Relacionamento N:N entre produtos e insumos.
- [x] **Gestão de Estoque:** Controle de níveis mínimos, custos unitários e alertas.
- [x] **Sugestão Inteligente:** Resposta estratégica para otimização de produção.
- [x] **Histórico de Produção:** Logs detalhados com rastreabilidade total.

---

## 🧪 Qualidade e Testes

O projeto segue rigorosos padrões de qualidade. Utilize os comandos abaixo para validar:

### 🖥️ Testes End-to-End (Cypress)
Garante que o fluxo do usuário (Front + Back) funcione perfeitamente.
```bash
# Execução via Interface Gráfica
cd frontend && npx cypress open

# Execução em modo Headless (CI/CD)
cd frontend && npx cypress run

⚙️ Testes Unitários e Isolados (Backend)
Valida as regras de negócio e cálculos matemáticos isoladamente.

Bash
cd backend && ./mvnw test
⚡ Como Executar o Projeto
📋 Pré-requisitos
Java: 17 (LTS)

Node.js: 18+

Banco de Dados: MySQL 8.0 (Porta 3306)

1️⃣ Inicialização do Backend
O Quarkus gerencia a criação das tabelas e a carga inicial de dados automaticamente.

Bash
cd backend
./mvnw quarkus:dev
2️⃣ Inicialização do Frontend
O servidor do Vite já está configurado com proxy para o backend na porta 8080.

Bash
cd frontend
npm install
npm run dev
URL de acesso: http://localhost:5173

🐳 Rodando com Docker (Recomendado)
Para uma avaliação rápida e consistente em ambiente isolado, utilize o Docker Compose:

Bash
# Sobe a stack completa: MySQL + Backend + Frontend
docker-compose up --build
<div align="center">

Desenvolvido como Prova de Conceito (PoC) para Arquitetura Full Stack.
<br />
Feito com ☕ e foco em Código Limpo.

</div>

