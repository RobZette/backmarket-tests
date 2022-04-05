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
  password: faker.internet.password() + faker.datatype.number()
};


describe('Create an account', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/register')
    cy.contains('C\'est OK pour moi').click()
  })

  it('create a new working user', () => {
    cy.get('[data-test="signup-component"] #firstName').should('not.have.css','border-color', 'rgb(169, 15, 20)').type(userData.firstName).should('have.value', userData.firstName)
    cy.get('[data-test="signup-component"] #lastName').should('not.have.css','border-color', 'rgb(169, 15, 20)').type(userData.lastName).should('have.value', userData.lastName)
    cy.get('[data-test="signup-component"] #signup-email').should('not.have.css','border-color', 'rgb(169, 15, 20)').type(userData.email).should('have.value', userData.email)
    cy.get('[data-test="signup-component"] #signup-password').should('not.have.css','border-color', 'rgb(169, 15, 20)').type(userData.password)
    cy.get('button[data-qa="signup-submit-button"]').should('include.text','Enchantés').click()
    //cy.get('[data-test="input-password"] p').should('not.have.css','color', 'rgb(169, 15, 20)')

    cy.get('button[aria-label="Sous-menu utilisateur"]').click()
    cy.get('header a[href="/dashboard/profile"]').should('include.text', 'Mon Compte').click()

    cy.get('div[data-test="myprofile-profile-user-info"] span').should('include.text', userData.firstName + userData.lastName)
    //cy.get('div[data-test="myprofile-profile-user-info"]').should('include.text', userData.lastName)
    cy.get('div[data-test="myprofile-profile-user-info"]').should('include.text', userData.email.toLocaleLowerCase())
  })

  it('Invalid password and first name', () => {
    //cy.get('#firstName').type(userData.firstName).should('have.value', userData.firstName)
    cy.get('[data-test="signup-component"] #lastName').type(userData.lastName).should('have.value', userData.lastName)
    cy.get('[data-test="signup-component"] #signup-email').type(userData.email).should('have.value', userData.email)
    cy.get('[data-test="signup-component"] #signup-password').type("1234")
    cy.contains('Enchantés').click()
    //cy.get('[data-test="input-password"] p').should('include.text', 'Au moins 8 caractères, dont 1 majuscule, 1 minuscule et 1 chiffre. Parce qu\'on sait jamais.')
    cy.get('[data-test="input-password"] p').should('have.css','color', 'rgb(169, 15, 20)')
    cy.get('#firstName').should('have.css','border-color', 'rgb(169, 15, 20)')
  })

  it('login with the created user', () => {
    cy.get('[data-test="signin-component"] #signin-email').type(userData.email).should('have.value', userData.email)
    cy.get('[data-test="input-password"] #signin-password').type(userData.password)
    cy.get('button[data-qa="signin-submit-button"]').should('include.text','Welcome Back!').click()

    cy.get('[data-test="dashboard-navigation-profil"]').click()

    cy.get('div[data-test="myprofile-profile-user-info"] span').should('include.text', userData.firstName + userData.lastName)
    cy.get('div[data-test="myprofile-profile-user-info"]').should('include.text', userData.email.toLocaleLowerCase())


  })

})
