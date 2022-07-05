/// <reference types="cypress" />

let nameField = "[name='name']";
let sessionLanguage = "[name='language']";
let documentCountryField= "[name='documentCountry']";
let documentTypeField = "[name='documentType']";
let launchVeriffViaInContextButton = "[value='incontext']";
let launchVeriffViaRedirectButton = "[value='redirect']";
let veriffMeButton = "[type='submit']";

import { REDIRECT } from '../constants';

export class ConfigsPage {

   static navigateToVeriffDemo() {
    //url is defined as an environment variable in cypress.config.js
        cy.visit(Cypress.env('veriff_url'));
      return this;
      }

    static fillConfigurations(name, language, country, document, launchVia){

      cy.get(nameField).clear();
      cy.get(nameField).type(name);
      
      cy.get(sessionLanguage).click();
      cy.contains('li[role="option"]', language)      
      .click();

      cy.get(documentCountryField).type(country);
      cy.contains('[role="listbox"]', country)
      .click();

      cy.get(documentTypeField).click({ force: true })
      cy.contains('li[role="option"]', document)      
      .click();

      if(launchVia==REDIRECT){
        cy.get(launchVeriffViaRedirectButton).click();
      }else{
        cy.get(launchVeriffViaInContextButton).click();
      }
  
    }

    static submitConfigurations(){
      cy.get(veriffMeButton).click();
    }




}