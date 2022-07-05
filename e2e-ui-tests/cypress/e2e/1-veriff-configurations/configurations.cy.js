/// <reference types="cypress" />

import { ConfigsPage } from "../../support/pages/configs-page"
import { QrCodePage } from "../../support/pages/qr-code-page";
import { REDIRECT, INCONTEXT } from '../../support/constants';

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

describe('example to-do app', () => {
  beforeEach(() => {
ConfigsPage.navigateToVeriffDemo();

  })

  it('Redirect test', () => {
    ConfigsPage.fillConfigurations("Niron Rasanjana","English" ,"Sri Lanka", "Passport", REDIRECT);
    ConfigsPage.submitConfigurations();
    QrCodePage.verifyQRcodeWithRedirect();
    QrCodePage.exitVerification();
  })

  it('Redirect test', () => {
    ConfigsPage.fillConfigurations("Niron Rasanjana","English" ,"Sri Lanka", "Passport", INCONTEXT);
    ConfigsPage.submitConfigurations();
    QrCodePage.verifyQRcodeInContext();
    QrCodePage.exitVerification();
  })


  
})
