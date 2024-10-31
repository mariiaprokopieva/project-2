/// <reference types="cypress"/>
/**
 * 
 * @param {array} credentials - array with two string elements, username and password
 * @description entering provided credentials into input boxes and clicks submit button
 */
function enterSubmitCredentials(credentials) {
    cy.get('form input').each(($el, index) => {
        cy.wrap($el).type(credentials[index]);
    });

    cy.get('#login_btn').click();
}

describe('Login Function', () => {

    beforeEach(() => {
        cy.visit('https://techglobal-training.com/frontend/project-2');
      });

    
      it('Test Case 01 - Validate the login form', () => {

        const labels = [ 'Please enter your username', 'Please enter your password' ]; 

        cy.get('form input').each(($el) => {
            cy.wrap($el).should('be.visible')
            .and('not.have.attr', 'required');
        });

        cy.get('form label').each(($el, index) => {
            cy.wrap($el).should('have.text', labels[index]);
        });

        cy.get('#login_btn').should('be.visible')
        .and('have.text', 'LOGIN').click();

        cy.get('form a').should('be.visible')
        .and('have.text', 'Forgot Password?').click();
      });

    

      it('Test Case 02 - Validate the valid login', () => {

        const validCredentials = [ 'TechGlobal', 'Test1234' ];
        
        enterSubmitCredentials(validCredentials);

        cy.get('#success_lgn').should('have.text', 'You are logged in');

        cy.get('#logout').should('be.visible')
        .and('have.text', 'LOGOUT')
        .click();

        cy.get('form').should('exist');
      });


      it('Test Case 03 - Validate the logout', () => {

        const validCredentials = [ 'TechGlobal', 'Test1234' ];
        
        enterSubmitCredentials(validCredentials);
        
        cy.get('#logout').click();

        cy.get('.LoginForm_form__m12Jc').should('be.visible');
      })


      it('Test Case 04 - Validate the Forgot Password? Link and Reset Password modal', () => {

        const emailLabelForReset = "Enter your email address and we'll send you a link to reset your password. ";
        cy.get('form a').click();

        cy.get('#modal_title').should('be.visible')
        .and('have.text', 'Reset Password');

        cy.get('.delete').should('be.visible');

        cy.get('#email').should('be.visible');

        cy.get('[for="email"]').should('have.text', emailLabelForReset);

        cy.get('#submit').should('be.visible')
        .and('have.text', 'SUBMIT')
        .click();

        cy.get('.delete').click();
        cy.get('.modal-card').should('not.exist');
      });


      it('Test Case 05 - Validate the Reset Password modal close button', () => {

        cy.get('form a').click();

        cy.get('.modal').should('be.visible');

        cy.get('.delete').click();

        cy.get('.modal').should('not.exist');
      });


      it('Test Case 06 - Validate the Reset Password form submission', () => {

        const confirmationMessage = 'A link to reset your password has been sent to your email address.';

        cy.get('form a').click();

        cy.get('#email').type('mariiaprokopieva@gmail.com');

        cy.get('#submit').click();

        cy.get('#confirmation_message').should('have.text', confirmationMessage);
      });

      const arr = [
        {
          testDescription: 'Test Case 07 - Validate the invalid login with the empty credentials',
          username: '',
          password: '',
          errorMessage: 'Invalid Username entered!'
        },
        {
          testDescription: 'Test Case 08 - Validate the invalid login with the wrong username',
          username: 'John',
          password: 'Test1234',
          errorMessage: 'Invalid Username entered!'
        },
        {
          testDescription: 'Test Case 09 - Validate the invalid login with the wrong password',
          username: 'TechGlobal',
          password: '1234',
          errorMessage: 'Invalid Password entered!'
        },
        {
          testDescription: 'Test Case 10 - Validate the invalid login with the wrong username and password',
          username: 'John',
          password: '1234',
          errorMessage: 'Invalid Username entered!'
        }
      ];

      arr.forEach((arrEl) => {
        it(arrEl.testDescription, () => {
          const credentials = [arrEl.username, arrEl.password];
          if(arrEl.username && arrEl.password) cy.get('form input').each(($el, index) => {
            cy.wrap($el).type(credentials[index]);
        });
        cy.get('#login_btn').click();

        cy.get('#error_message').should('be.visible')
        .and('have.text', arrEl.errorMessage);
        });
      });
});