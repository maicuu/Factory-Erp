/* global cy, describe, it, beforeEach */

describe('Fluxo Operacional - Factory ERP', () => {
  
  beforeEach(() => {
    cy.visit('/');

    // 1. NAVEGAÇÃO PRECISA: Forçamos o clique no botão/link de Produção
    // Isso evita que ele clique no span decorativo minúsculo
    cy.get('button, a').contains(/Produção/i).click({ force: true });

    // 2. Aguarda o loader sumir (Sincronizando...)
    cy.contains(/Sincronizando/i, { timeout: 15000 }).should('not.exist');
    
    // 3. VALIDAÇÃO DE CHEGADA: Esperamos o título que você tem no código
    cy.contains('Capacidade Técnica', { timeout: 10000 }).should('be.visible');
  });

  it('Deve validar os indicadores de lucro no Header do Dashboard', () => {
    // Mudamos o seletor para pegar a DIV com rounded-3xl
    // Isso ignora o <header> do topo do site e foca no Card de Lucro
    cy.get('div.bg-slate-900.rounded-3xl').first().within(() => {
      // Usamos apenas 'Lucro' para evitar erros de quebra de linha do HTML
      cy.contains(/Lucro/i).should('be.visible');
      
      // Valida que existe um valor em Reais
      cy.contains(/R\$/).should('be.visible');
      
      // Valida a margem
      cy.contains(/Margem/i).should('be.visible');
    });
  });

  it('Deve interagir com o fluxo de produção', () => {
    // Busca os botões dentro do grid de Capacidade Técnica
    // Usamos o texto exato do seu código: 'Produzir Item' ou 'Ver Pendências'
    cy.get('button').contains(/Produzir|Pendências/i).first().click({ force: true });

    // Aguarda o modal do SweetAlert aparecer
    cy.get('.swal2-popup', { timeout: 8000 }).should('be.visible');
    
    // Lógica para preencher a quantidade apenas se o campo existir (Fluxo de Produção)
    cy.get('body').then(($body) => {
      if ($body.find('#swal-input-qty').length > 0) {
        cy.get('#swal-input-qty').clear().type('1');
        // Clica no botão de confirmação que você estilizou
        cy.contains('Confirmar Produção').click();
      }
    });

    // Fecha o modal de sucesso ou aviso
    cy.contains(/Cancelar|Entendi|OK/i).click({ force: true });
  });
});