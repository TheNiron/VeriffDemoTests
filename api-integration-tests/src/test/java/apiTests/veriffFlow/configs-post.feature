Feature: Verify veriff flow apis
# steps in Background are executed before each Scenario in this file
  Background:
    * url veriffBaseUrl

  Scenario: Create a new veriff session and verify response
    Given request read('jsonBody/session-request-body.json')
    And header Content-Type = 'application/json'
    When method POST
    Then status 200
    And match response contains { integrationUrl: 'https://magic.saas-3.veriff.me' }
    And match response contains { sessionToken: '#notnull' }

#    For better test readablity the test sceanrios will be seperated depending on the inputs, name, country, document type.
  Scenario Outline: Create a new veriff session with invalid Name input combinations and verify response
    Given request {"full_name":'<full_name>',"document_country":"AL","document_type":"PASSPORT","additionalData":{"isTest":false}}
    And header Content-Type = 'application/json'
    When method POST
    Then assert responseStatus != 200
    And match response not contains { integrationUrl: 'https://magic.saas-3.veriff.me' }
    And match response not contains { sessionToken: '#notnull' }

    Examples:
      | full_name            |
      | Andrew@Garfield      |
      | 1232Garfield         |
      | 34567 888923         |
      | 34567" " - = #888923 |

# Following is a regresstion test for issue found when testing manually. Response 400 is coming for some Counries and document combinations.
# Test is a data driven test, will read input countries and documents from countries-and-documents.json
  Scenario Outline: Create a new veriff session with different input combinations and verify response
    Given request {"full_name":'Bruce Banner',"document_country":'<document_country>',"document_type":'<document_type>',"additionalData":{"isTest":false}}
    And header Content-Type = 'application/json'
    When method POST
    Then status 200
    And match response contains { integrationUrl: 'https://magic.saas-3.veriff.me' }
    And match response contains { sessionToken: '#notnull'}

    Examples:
      | read('jsonBody/countries-and-documents.json') |

  Scenario: Make multiple session requests with same inputs and validate
    Given request read('jsonBody/session-request-body.json')
    And header Content-Type = 'application/json'
    When method POST
    Then status 200
    Given request read('jsonBody/session-request-body.json')
    And header Content-Type = 'application/json'
    When method POST
    Then status 200
    And match response contains { integrationUrl: 'https://magic.saas-3.veriff.me' }
    And match response contains { sessionToken: '#notnull' }

  Scenario Outline: Create a new veriff session with invalid countries and document types
    Given request {"full_name":'William Wonka',"document_country":"<document_country>","document_type":"<document_type>","additionalData":{"isTest":false}}
    And header Content-Type = 'application/json'
    When method POST
    Then assert responseStatus == 400

    Examples:
      | document_country | document_type    |
      | XX               | PASSPORT         |
      | T1               | ID_CARD          |
      | ci               | RESIDENCE_PERMIT |
      | kk               | DRIVERS_LICENSE  |
      | EE               | passport2        |
      | EE               |                  |
      | EE               | 23423            |
      | EE               | B-cert           |
      |                  |                  |

