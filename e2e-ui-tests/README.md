## Run E2E UI tests in Local
Prerequisites : Node.js 12 or 14 and above
 
1. Clone repository to your local
2. Navigate to VeriffDemoTests/e2e-ui-tests in terminal
3. Run "npm install"

#### Run tests in headless mode with Chrome
 npx cypress run --browser chrome
###### Reports : 
After tests are executed, report can be found in "reports/html/index.html"

#### Run with cypress UI
 npx cypress open

## Run E2E UI tests in Docker
If you have docker installed, you can just pull the image I have created and run tests with it. The docker will volume the results report at the end of tests to your local machine.

1. Pull the docker image: ```docker pull rasanjana29/veriff-demo-ui-tests:1.0.0```
2. Run the docker ```docker run -t -i -v ${PWD}/Veriff-ui-test-reports:/e2e-test/cypress/reports rasanjana29/veriff-demo-ui-tests:1.0.0 npx cypress run --browser chrome```

In the above command you can also change the browser you want to run the tests in with headless mode. 
Ex:
* --browser firefox
* --browser edge
* --browser chromium

After the tests are executed, a test report will be generated in the current directory of the terminal with name “Veriff-ui-test-reports/html/index.html”.

note for MAC M1 users : Unfortunately, Cypress tests can't be run with docker on linux/arm64 systems yet. There's an open issue for this:  https://github.com/cypress-io/cypress-docker-images/issues/431

html report : 
<img width="1724" alt="Screenshot 2022-07-08 at 5 12 48 PM" src="https://user-images.githubusercontent.com/32265029/177985795-2a10b3d8-ce5a-40aa-8dfd-c8f0a22c9ac8.png">

