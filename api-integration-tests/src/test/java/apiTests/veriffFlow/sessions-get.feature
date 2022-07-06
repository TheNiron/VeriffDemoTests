Feature: Verify veriff session GET API

  Background:
    Given url veriffBaseUrl
    And request read('jsonBody/session-request-body.json')
    And header Content-Type = 'application/json'
    When method POST
    Then status 200
    And def sessionToken = response.sessionToken
    *  url veriffSessionsUrl

  Scenario: Create a new veriff session and verify response
    Given path '/sessions'
    And header Authorization = 'Bearer ' + sessionToken
    When method GET
    Then status 200
    And match response contains { id: '#uuid', status: 'created' }

  Scenario: Verify enterd session data
    Given path '/sessions'
    And header Authorization = 'Bearer ' + sessionToken
    When method GET
    Then status 200
    And match response contains { id: '#uuid', status: 'created' }
    * def documentData = response.activeVerificationSession.document
    * match documentData.country == 'AL'
    * match documentData.type == 'PASSPORT'

  Scenario: Validate an invalid session token
    Given path '/sessions'
    And header Authorization = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIs2325cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoiMDI0ZGZmMzMtZTJlYi00OTc4LWFkN2MtN2M3MjMzMzk4ODAzIiwiaWF0IjoxNjU3MTAzMzYyfQ'
    When method GET
    Then status 401
    And match response contains { message: 'Authentication failed'}