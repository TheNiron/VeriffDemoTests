/// <reference types="cypress" />

let iframe = 'iframe[id="veriffFrame"]';
let exitbutton = 'button[aria-label="Exit"]';
let leavingMessage = 'Leaving so soon?';

export class QrCodePage{
    
    static verifyQRcodeInContext(){
        cy.getIframeBody()
        .find('h1').should('have.text', "Let's get you verified").click()
        cy.getIframeBody()
        .find('h2').should('have.text', "Scan the QR code").click()
      }

      static verifyQRcodeWithRedirect(){
        cy.get(iframe).should('not.exist');
        cy.get('h1').should('have.text', "Let's get you verified").click()
        cy.get('h2').should('have.text', "Scan the QR code").click()
      }

      static exitVerification(){
        cy.get("body").then($body => {
            if ($body.find(exitbutton).length > 0) {   
               cy.get(exitbutton).click();
               cy.get('h1').eq(1).should('have.text', leavingMessage);
            //    cy.get('button[type="button"]').should('have.text', 'Exit').click();
            //    cy.contains('button[type="button"]', 'Exit').click();
               cy.get('[type="button"]').eq(5).contains('Exit').click();

            } else{
                cy.getIframeBody()
                .find(exitbutton).click();
                cy.getIframeBody()
                .find('h1').eq(1).should('have.text', leavingMessage);
                cy.getIframeBody()
                .find('button[type="button"]').should('have.text', 'Exit').click();
            }

        });

      }



}