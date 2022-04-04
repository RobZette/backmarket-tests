/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

import { faker } from '@faker-js/faker';

let userData = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};


describe('Create an account', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://preprod.backmarket.fr/register')
  })

  it('refuse cookies then create a new working user', () => {
    cy.get('._2GKLH9j3Pa1wGMII3Gp4aI button').should('have.class', '_3VT0k4UG')
    cy.get('._2GKLH9j3Pa1wGMII3Gp4aI button').should('have.class', '_3nh67M3k')
    cy.get('._2GKLH9j3Pa1wGMII3Gp4aI ._3VT0k4UG').click()

    cy.get('#firstName').should('not.have.css','border-color', 'rgb(169, 15, 20)').type(userData.firstName).should('have.value', userData.firstName)
    cy.get('#lastName').should('not.have.css','border-color', 'rgb(169, 15, 20)').type(userData.lastName).should('have.value', userData.lastName)
    cy.get('#signup-email').should('not.have.css','border-color', 'rgb(169, 15, 20)').type(userData.email).should('have.value', userData.email)
    cy.get('#signup-password').should('not.have.css','border-color', 'rgb(169, 15, 20)').type(userData.password)
    cy.contains('Enchantés').click()
    cy.get('[data-test="input-password"] p').should('not.have.css','color', 'rgb(169, 15, 20)')

  })

  it('Invalid password and first name', () => {
    cy.get('._2GKLH9j3Pa1wGMII3Gp4aI button').should('have.class', '_3VT0k4UG')
    cy.get('._2GKLH9j3Pa1wGMII3Gp4aI button').should('have.class', '_3nh67M3k')
    cy.get('._2GKLH9j3Pa1wGMII3Gp4aI ._3VT0k4UG').click()

    //cy.get('#firstName').type(userData.firstName).should('have.value', userData.firstName)
    cy.get('#lastName').type(userData.lastName).should('have.value', userData.lastName)
    cy.get('#signup-email').type(userData.email).should('have.value', userData.email)
    cy.get('#signup-password').type("1234")
    cy.contains('Enchantés').click()
    //cy.get('[data-test="input-password"] p').should('include.text', 'Au moins 8 caractères, dont 1 majuscule, 1 minuscule et 1 chiffre. Parce qu\'on sait jamais.')
    cy.get('[data-test="input-password"] p').should('have.css','color', 'rgb(169, 15, 20)')
    cy.get('#firstName').should('have.css','border-color', 'rgb(169, 15, 20)')
  })
})
