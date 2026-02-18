/* global cy, describe, it, beforeEach */

describe('Responsividade - Factory ERP', () => {
  
  const viewports = [
    { device: 'iPhone XR', width: 414, height: 896 },
    { device: 'iPad (geração 2)', width: 768, height: 1024 },
    { device: 'Macbook 13', width: 1280, height: 800 }
  ];

  beforeEach(() => {
    cy.visit('/');
    // Navega para a aba de Produção
    cy.get('button, a').contains(/Produção/i).click({ force: true });
    cy.contains(/Sincronizando/i, { timeout: 15000 }).should('not.exist');
  });

  viewports.forEach((viewport) => {
    it(`Deve renderizar corretamente no ${viewport.device}`, () => {
      // Ajusta o tamanho da tela
      cy.viewport(viewport.width, viewport.height);

      // 1. O card de Lucro deve estar visível, independente do tamanho
      cy.get('div.bg-slate-900.rounded-3xl').should('be.visible');

      // 2. No Mobile (iPhone), o Header do dashboard deve empilhar (flex-col)
      if (viewport.width < 768) {
        cy.get('div.bg-slate-900.rounded-3xl > div')
          .should('have.class', 'flex-col');
      }

      // 3. O grid de sugestões deve ser visível (mesmo que mude a quantidade de colunas)
      cy.contains(/Otimização de/i).should('be.visible');

      // 4. Os botões de ação devem continuar clicáveis
      cy.get('button').contains(/Produzir|Pendências/i)
        .first()
        .should('be.visible')
        .and('not.be.disabled');
    });
  });

  it('Deve mostrar/esconder o menu lateral se houver comportamento de hambúrguer', () => {
    cy.viewport('iphone-xr');
    
    // Se você tiver um menu lateral que vira hambúrguer no mobile:
    // cy.get('button[aria-label="Menu"]').click();
    // cy.get('nav').should('be.visible');
    
    // No seu caso, validamos se o texto principal ainda cabe na tela sem overflow
    cy.get('body').should('not.have.css', 'overflow-x', 'scroll');
  });
});