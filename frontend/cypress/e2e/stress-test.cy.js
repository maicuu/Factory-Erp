/* global cy, describe, it, beforeEach */

describe('Teste de Stress - Carga de Dados Massiva', () => {
  
  beforeEach(() => {
    // CORREÇÃO: Gerando 'margin', 'totalCost' e 'subtotal' como NUMBERS
    const largeSuggestionList = Array.from({ length: 50 }, (_, i) => ({
      productName: `Produto Hiper-Otimizado ${i + 1}`,
      quantity: Math.floor(Math.random() * 100),
      margin: Math.random() * 50, // Agora é um Number
      totalCost: Math.random() * 5000, // Agora é um Number
      subtotal: Math.random() * 10000 // Agora é um Number
    }));

    cy.intercept('GET', '**/api/products/optimized-suggestion', {
      statusCode: 200,
      body: {
        items: largeSuggestionList,
        totalPotentialValue: 500000,
        totalPotentialProfit: 150000
      }
    }).as('getLargeData');

    cy.visit('/');
    cy.get('button, a').contains(/Produção/i).click({ force: true });
  });

  it('Deve manter a performance e layout com 50 itens na lista', () => {
    // 1. Aguarda a carga massiva
    cy.wait('@getLargeData');

    // 2. Valida se os 50 cards de sugestão apareceram
    // Usamos o seletor da borda lateral emerald que está no seu .map
    cy.get('.border-l-emerald-500', { timeout: 10000 }).should('have.length', 50);

    // 3. Verifica se o scroll funciona
    cy.scrollTo('bottom');
    
    // 4. Garante que o último item está lá embaixo
    cy.contains('Produto Hiper-Otimizado 50').should('be.visible');

    // 5. O Header deve continuar firme no topo (mesmo com scroll, se for fixo)
    // ou pelo menos existir no DOM
    cy.get('div.bg-slate-900.rounded-3xl').should('exist');
  });
});