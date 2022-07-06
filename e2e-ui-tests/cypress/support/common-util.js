export class CommonUtils {

  static validateCurrentPageUrl(url) {
    cy.url().should('contain', url)
  }

}