/// <reference types="cypress" />

import { ConfigsPage } from "../../support/pages/configs-page"
import { SessionApi } from "../../support/apis/session-api"
import { QrCodePage } from "../../support/pages/qr-code-page";
import { REDIRECT, INCONTEXT, VERIF_URL } from '../../support/constants';
import { CommonUtils } from "../../support/common-util";
import { PrivacyPolicyPage } from "../../support/pages/privacy-policy-page";

const dataJson = require('../../fixtures/mixedInputDataSet');
const DocumentJson = require('../../fixtures/DocumentTypesDataSet');

describe('Test the Veriff demo flow with Configurations', () => {

  beforeEach(() => {
    ConfigsPage.navigateToVeriffDemo();
  })

  it('Validate Veriff flow with valid details for all fields and Incontext is selected', () => {
    ConfigsPage.fillConfigurations("Niron Rasanjana", "English", "Sri Lanka", "Passport", INCONTEXT);
    ConfigsPage.submitConfigurations();
    SessionApi.verifySessionCreationResponseCode(200);
    QrCodePage.verifyQRcodeInContext();
    QrCodePage.exitVerification();
  })

  it('Validate Veriff flow with valid details for all fields and Redirect is selected', () => {
    ConfigsPage.fillConfigurations("Niron Rasanjana", "English", "Sri Lanka", "Passport", REDIRECT);
    ConfigsPage.submitConfigurations();
    SessionApi.verifySessionCreationResponseCode(200);
    QrCodePage.verifyQRcodeWithRedirect();
    QrCodePage.exitVerification();
  })

  it('Validate error message by submitting without filling anything', () => {
    ConfigsPage.submitConfigurations();
    // We should assert if there's an error message saying 'Mandatory fields are empty'. but as an error message is not there, we will be verifying user is not navigated to the QR page
    QrCodePage.VerifyNotNaviagtedToQRCode();
  })

  it('Validate sample text in Name field disappears when clicked', () => {
    ConfigsPage.validateNameFieldContainsText();
    ConfigsPage.validateNameDisappearsWhenClicked();
  })

  it('Validate Privacy Policy', () => {
    ConfigsPage.clickPrivacyPolicy();
    PrivacyPolicyPage.verifyPrivacyHeading();
    PrivacyPolicyPage.verifyNoOfPolicyListLinks(16);
  })

  it('Validate without filling the name field', () => {
    ConfigsPage.clearName()
    ConfigsPage.fillLanguage("English")
    ConfigsPage.fillCountry("Sri Lanka")
    ConfigsPage.fillDocument("Passport")
    ConfigsPage.clickLaunchVia("redirect")
    ConfigsPage.submitConfigurations();
    QrCodePage.VerifyNotNaviagtedToQRCode();
  })

  it('Validate without filling session language field', () => {
    ConfigsPage.fillName("peter pettigrew")
    ConfigsPage.fillCountry("Sri Lanka")
    ConfigsPage.fillDocument("Passport")
    ConfigsPage.clickLaunchVia("redirect")
    ConfigsPage.submitConfigurations();
    QrCodePage.VerifyNotNaviagtedToQRCode();
  })

  it('Validate without filling document country field', () => {
    ConfigsPage.fillName("peter pettigrew")
    ConfigsPage.fillLanguage("English")
    ConfigsPage.fillDocument("Passport")
    ConfigsPage.clickLaunchVia("redirect")
    ConfigsPage.submitConfigurations();
    QrCodePage.VerifyNotNaviagtedToQRCode();
  })

  it('Validate without fiiling document type field ', () => {
    ConfigsPage.fillName("peter pettigrew")
    ConfigsPage.fillLanguage("English")
    ConfigsPage.fillCountry("Sri Lanka")
    ConfigsPage.clickLaunchVia("redirect")
    ConfigsPage.submitConfigurations();
    QrCodePage.VerifyNotNaviagtedToQRCode();
  })

  it('Verify user is navigated to verif demo if user exit QR page - InContext', () => {
    ConfigsPage.fillConfigurations("Niron Rasanjana", "English", "Estonia", "Passport", INCONTEXT);
    ConfigsPage.submitConfigurations();
    QrCodePage.verifyQRcodeInContext();
    QrCodePage.exitVerification();
    CommonUtils.validateCurrentPageUrl(Cypress.env(VERIF_URL));
  })

  it('Verify user is navigated to verif demo if user exit QR page - Redirect', () => {
    ConfigsPage.fillConfigurations("Niron Rasanjana", "English", "Sri Lanka", "Passport", REDIRECT);
    ConfigsPage.submitConfigurations();
    QrCodePage.verifyQRcodeWithRedirect();
    QrCodePage.exitVerification();
    CommonUtils.validateCurrentPageUrl(Cypress.env(VERIF_URL));
  })

  // Following test is a data driven test where valid mixed set of inputs are fed from mixedInputDataSet.json
  dataJson.forEach((userInput) => {
    it('Validate configurations with different valid input data', function () {
      ConfigsPage.fillConfigurations(userInput.name, userInput.language, userInput.country, userInput.document, userInput.launchVia);
      ConfigsPage.submitConfigurations();
      SessionApi.verifySessionCreationResponseCode(200);
      QrCodePage.verifyQRcodeCommon();
      QrCodePage.exitVerification();
    });
  });

  // Following test is a data driven test where different document types are fed from DocumentTypesDataSet.json
  // This test will fail cause 400 response is coming for some document types
  DocumentJson.forEach((documentTypes) => {
    it('Validate configurations with different document types entered', function () {
      ConfigsPage.fillConfigurations("Niron Rasanjana", "English", "Sri Lanka", documentTypes.document, REDIRECT);
      ConfigsPage.submitConfigurations();
      SessionApi.verifySessionCreationResponseCode(200);
      QrCodePage.verifyQRcodeCommon();
      QrCodePage.exitVerification();
    });
  });

  it('Validate the language is changed as expected', () => {
    ConfigsPage.fillConfigurations("Niron Rasanjana", "Español (España)", "Sri Lanka", "Passport", REDIRECT);
    ConfigsPage.submitConfigurations();
    QrCodePage.verifyLanguageIsChangedInQrPage("Vamos a verificarte");
  })


})


