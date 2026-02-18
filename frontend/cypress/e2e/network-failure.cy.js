/* global cy, describe, it */

describe('Resiliência - Falhas de Conexão e Erros de Servidor', () => {
  
  it('Deve lidar com erro 500 na carga inicial dos dados', () => {
    // 1. Simula erro interno do servidor
    cy.intercept('GET', '**/api/products/availability', {
      statusCode: 500,
      body: { error: "Internal Server Error" }
    }).as('getAvailabilityError');

    cy.visit('/');
    cy.get('button, a').contains(/Produção/i).click({ force: true });

    // 2. Aguarda a falha
    cy.wait('@getAvailabilityError');

    // 3. O loader deve sumir (garante que o app não travou no loading)
    cy.contains(/Sincronizando/i).should('not.exist');

    // 4. Valida que a seção existe, mas está vazia (comportamento atual do seu código)
    cy.get('h3').contains('Capacidade Técnica').should('be.visible');
    // Verifica se a lista de cards está vazia
    cy.get('div.grid').last().children().should('have.length', 0);
  });

  it('Deve lidar com queda total de rede (Network Failure)', () => {
    // Simula que a internet caiu ou o servidor está inacessível
    cy.intercept('GET', '**/api/products/optimized-suggestion', {
      forceNetworkError: true
    }).as('networkError');

    cy.visit('/');
    cy.get('button, a').contains(/Produção/i).click({ force: true });

    cy.wait('@networkError');

    // Verifica se o dashboard exibe valores zerados (estado inicial do useState)
    // Em vez de quebrar a tela com um erro de undefined
    cy.contains('R$ 0,00').should('be.visible');
  });
});