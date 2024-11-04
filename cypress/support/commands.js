// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
/**
 * @param {array} credentials - array with two string elements, username and password
 * @description entering provided credentials into input boxes and clicks submit button
 */
    Cypress.Commands.add('enterSubmitCredentials', (credentials) => {
        cy.get('form input').each(($el, index) => {
            cy.wrap($el).type(credentials[index]);
        });
    
        cy.get('#login_btn').click();
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })