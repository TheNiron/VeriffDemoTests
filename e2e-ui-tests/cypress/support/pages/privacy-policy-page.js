/// <reference types="cypress" />
let listMenu = '[class="sticky-inner-wrapper"]';

export class PrivacyPolicyPage{

    static verifyPrivacyHeading(){
        cy.get('h1').should('have.text', "Privacy policy")
    }

    static verifyNoOfPolicyListLinks(noOfLinks){
        cy.get(listMenu).find('a').should('have.length', noOfLinks)
    }
    


}