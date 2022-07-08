/// <reference types="cypress" />

let nameField = "[name='name']";
let sessionLanguage = "[name='language']";
let documentCountryField = "[name='documentCountry']";
let documentTypeField = "[name='documentType']";
let launchVeriffViaInContextButton = "[value='incontext']";
let launchVeriffViaRedirectButton = "[value='redirect']";
let veriffMeButton = "[type='submit']";

import { REDIRECT, VERIF_URL } from '../constants';

export class ConfigsPage {

  static navigateToVeriffDemo() {
    //url is defined as an environment variable in cypress.config.js
    cy.visit(Cypress.env(VERIF_URL));
    return this;
  }

  static fillConfigurations(name, language, country, document, launchVia) {
    this.fillName(name)
    this.fillLanguage(language)
    this.fillCountry(country)
    this.fillDocument(document)
    this.clickLaunchVia(launchVia)
  }

  static fillName(name) {
    cy.get(nameField).clear()
    cy.get(nameField).type(name)
    // Validate entered text is present
    cy.get(nameField).should('have.value', name)
  }

  static fillLanguage(language) {
    cy.get(sessionLanguage).click();
    cy.contains('li[role="option"]', language)
      .click();
  }

  static fillCountry(country) {
    cy.get(documentCountryField).type(country)
    cy.contains('[role="listbox"]', country)
      .click();
  }

  static fillDocument(document) {
    cy.get(documentTypeField).click()
    cy.contains('li[role="option"]', document)
      .click();
  }

  static clickLaunchVia(launchVia) {
    if (launchVia == REDIRECT) {
      cy.get(launchVeriffViaRedirectButton).click();
    } else {
      cy.get(launchVeriffViaInContextButton).click();
    }
  }

  static submitConfigurations() {
    cy.intercept('POST', Cypress.env(VERIF_URL)).as('session')
    cy.get(veriffMeButton).click();
  }

  static clickPrivacyPolicy() {
    cy.get('a').should('have.text', "Privacy Policy.").click()
  }

  static validateNameFieldContainsText() {
    cy.get(nameField).should('not.be.empty');
  }

  static validateNameDisappearsWhenClicked() {
    cy.get(nameField).click();
    cy.get(nameField).invoke('val').should('be.empty')
  }

  static clearName() {
    cy.get(nameField).clear()
  }


}