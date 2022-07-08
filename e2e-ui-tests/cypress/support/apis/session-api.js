/// <reference types="cypress" />

export class SessionApi {

    static verifySessionCreationResponseCode(code) {
        cy.wait('@session').then(({response}) => {
          expect(response.statusCode).to.eq(code)
        })
    
    }

  }