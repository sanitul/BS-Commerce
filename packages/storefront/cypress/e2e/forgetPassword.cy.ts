describe('Forget Password Journey', () => {
  it('should be redirected to forget password page', () => {
    cy.visit('/');
    cy.get('#menuicon').click();
    cy.get('#login').click({ force: true });
    cy.get('#sidebarClose').click();
    cy.get('#forgotPasswordDiv').click();
    cy.url().should(
      'eq',
      Cypress.config().baseUrl + '/account/forgot-password'
    );
    cy.get('#username').type('sbswarna@gmail.com');
    cy.contains('button', 'Submit').click();
    cy.get('#otp').type('1234');
    cy.contains('button', 'Submit').click();
    cy.get('#newPassword').type('123456');
    cy.get('#confirmPassword').type('123456');
    cy.contains('button', 'Submit').click();
  });
});

// describe('Cancel forget password', () => {
//   it('should be redirected to sign-in page', () => {
//     cy.visit('/');
//     cy.get('#menuicon').click();

//     //Go to Login page
//     cy.get('#login').click({ force: true });

//     cy.get('#sidebarClose').click();

//     cy.get('#forgotPasswordDiv').click();
//     cy.url().should(
//       'eq',
//       Cypress.config().baseUrl + '/account/forgot-password'
//     );
//     cy.get('#cancelDiv').click();
//     cy.url().should('eq', Cypress.config().baseUrl + '/account/sign-in');
//   });
// });

export {};
