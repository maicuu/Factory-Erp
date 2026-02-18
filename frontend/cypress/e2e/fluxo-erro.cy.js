/* global cy, describe, it, beforeEach */

describe('Tratamento de Erros - Estoque Insuficiente', () => {
  
  beforeEach(() => {
    // 1. Mock do Erro de Produção
    cy.intercept('POST', '**/api/products/*/produce/*', {
      statusCode: 400,
      body: "Estoque insuficiente. Itens necessários: Chapa de Aço, Motor Elétrico"
    }).as('postProducaoErro');

    cy.visit('/');

    // 2. CLIQUE PRECISO: Em vez de procurar por texto, vamos pelo seletor que você marcou em vermelho.
    // O seletor .border-blue-500 garante que estamos clicando no botão da aba ativa ou alvo.
    // Usamos 'contains' limitando ao elemento pai para não pegar o span pequeno.
    cy.get('button, a').contains('Produção').click({ force: true });

    // 3. Espera o loader sumir
    cy.contains(/Sincronizando/i, { timeout: 15000 }).should('not.exist');
    
    // 4. VALIDAÇÃO POR ELEMENTO ÚNICO: 
    // Como você disse que não tem título "clicável", vamos buscar pelo rótulo do Lucro 
    // ou pela seção de "Capacidade Técnica" que está no seu código.
    cy.contains('Capacidade Técnica', { timeout: 10000 }).should('be.visible');
  });

  it('Deve exibir a lista de insumos faltantes quando a produção falha', () => {
    // 5. Busca o botão "Produzir Item" ou "Ver Pendências"
    // No seu código: cap.maxPossible > 0 ? 'Produzir Item' : 'Ver Pendências'
    cy.get('button').contains(/Produzir|Pendências/i).first().click({ force: true });

    // 6. Se o modal de quantidade abrir (SweetAlert)
    cy.get('body').then(($body) => {
      if ($body.find('#swal-input-qty').length > 0) {
        cy.get('#swal-input-qty').clear().type('10');
        // Clica no botão "Confirmar Produção" que você definiu no Swal
        cy.contains('Confirmar Produção').click();
      }
    });

    // 7. Espera a resposta de erro
    cy.wait('@postProducaoErro');

    // 8. Valida a lista formatada no SweetAlert
    cy.get('.swal2-popup').within(() => {
      // O título que você definiu no catch: 'Estoque Insuficiente'
      cy.contains('Estoque Insuficiente').should('be.visible');
      
      // Valida se os itens que mockamos aparecem na lista <li>
      cy.get('ul li').should('have.length.at.least', 1);
      cy.contains('Chapa de Aço').should('be.visible');
      cy.contains('Motor Elétrico').should('be.visible');
    });

    cy.contains('OK').click();
  });
});