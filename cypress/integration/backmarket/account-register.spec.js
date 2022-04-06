/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

let userData = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password() + faker.datatype.number()
};


describe('Create an account', () => {
  beforeEach(() => {
    cy.visit('/register')
    cy.contains('C\'est OK pour moi').click()
  })

  it('create a new working user', () => {
    cy.get('[data-test="signup-component"] #firstName').type(userData.firstName).should('have.value', userData.firstName)
    cy.get('[data-test="signup-component"] #lastName').type(userData.lastName).should('have.value', userData.lastName)
    cy.get('[data-test="signup-component"] #signup-email').type(userData.email).should('have.value', userData.email)
    cy.contains('Au moins 8 caractères, dont 1 majuscule, 1 minuscule et 1 chiffre. Parce qu\'on sait jamais.').should('be.visible')
    cy.get('[data-test="signup-component"] #signup-password').type(userData.password).should('have.value', userData.password)
    cy.get('button[data-qa="signup-submit-button"]').should('include.text','Enchantés').click()

    cy.url().should('include', 'dashboard')
    cy.get('button[aria-label="Sous-menu utilisateur"]').click()
    cy.get('header a[href="/dashboard/profile"]').should('include.text', 'Mon Compte').click()

    cy.get('div[data-test="myprofile-profile-user-info"] span').should('include.text', userData.firstName + userData.lastName).and('be.visible')
    cy.get('div[data-test="myprofile-profile-user-info"]').should('include.text', userData.email.toLocaleLowerCase()).and('be.visible')
  
    cy.url().should('include', 'profile')
  })

  it.only('Invalid password and first name', () => {

    cy.get('[data-test="signup-component"] #lastName').type(userData.lastName).should('have.value', userData.lastName)
    cy.get('[data-test="signup-component"] #signup-email').type(userData.email).should('have.value', userData.email)
    cy.contains('Au moins 8 caractères, dont 1 majuscule, 1 minuscule et 1 chiffre. Parce qu\'on sait jamais.').should('be.visible')
    cy.get('[data-test="signup-component"] #signup-password').type("1234")

    cy.contains('Enchantés').click()

    cy.get('[data-test="input-password"]').find('#signup-password').should('have.class','border-danger').and('be.visible')
    cy.contains('Le champ "Prénom" est obligatoire ').should('be.visible')
    cy.get('#firstName').should('have.class','border-danger').and('be.visible')

    cy.url().should('include', 'register')
  })

  it('login with the created user', () => {
    cy.get('[data-test="signin-component"] #signin-email').type(userData.email).should('have.value', userData.email).and('be.visible')
    cy.get('[data-test="input-password"] #signin-password').type(userData.password)
    cy.get('button[data-qa="signin-submit-button"]').should('include.text','Welcome Back!').and('be.visible').click()
    cy.get('[data-test="signin-component"] a').should('contain', 'Mot de passe oublié ?').and('be.visible')
    cy.get('[data-test="dashboard-navigation-profil"]').click()

    cy.url().should('include', 'dashboard')
    cy.get('div[data-test="myprofile-profile-user-info"] span').should('include.text', userData.firstName + userData.lastName).and('be.visible')
    cy.get('div[data-test="myprofile-profile-user-info"]').should('include.text', userData.email.toLocaleLowerCase()).and('be.visible')

    cy.url().should('include', 'profile')
  })

  it('login with incorrect e-mail', () => {

    cy.get('[data-test="signin-component"]').find('#signin-email').should('be.visible').type('ee')
    cy.get('[data-test="input-password"]').find('#signin-password').should('be.visible').type('1234')

    cy.get('button[data-qa="signin-submit-button"]').should('include.text','Welcome Back!').and('be.visible').click()
    cy.get('[data-test="signin-component"]').find('#signin-email').should('have.class','border-danger')

    cy.url().should('include', 'register')
  })

  it('login with correct e-mail and no password', () => {

    cy.get('[data-test="signin-component"]').find('#signin-email').should('be.visible').type('ee@e.e')
    cy.get('[data-test="input-password"]').find('#signin-password').should('be.visible')

    cy.get('button[data-qa="signin-submit-button"]').should('include.text','Welcome Back!').and('be.visible').click()
    cy.get('[data-test="input-password"]').find('#signin-password').should('have.class','border-danger')

    cy.contains(' Le champ mot de passe est obligatoire ').should('be.visible')


    cy.url().should('include', 'register')
  })

  it('login with unknown email and password', () => {

    cy.get('[data-test="signin-component"]').find('#signin-email').should('be.visible').type('ee@e.e')
    cy.get('[data-test="input-password"]').find('#signin-password').should('be.visible').type('1234')

    cy.get('button[data-qa="signin-submit-button"]').should('include.text','Welcome Back!').and('be.visible').click()

    //cy.contains('Informations d\'identification erronées').should('be.visible')
    cy.contains('Informations d\'identification erronées').should('be.visible')
    
    cy.url().should('include', 'register')
  })

})
