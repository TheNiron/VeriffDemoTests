## Run API tests
Prerequisites : Java, Maven

1. Clone repository to your local
2. Navigate to VeriffDemoTests/api-integration-tests in terminal
3. Run "mvn test -Dtest=testRunner"

<img width="1222" alt="Screenshot 2022-07-06 at 11 34 51 PM" src="https://user-images.githubusercontent.com/32265029/177614802-664fbc54-b788-40ad-9a4c-7f51c793407e.png">

###### Reports :
After tests are executed, report can be found in "target/cucumeber-html-reports/"

## Run API tests in Docker
If you have docker installed, you can just pull the image I have created and run tests with it. The docker will volume the results report at the end of tests to your local machine.

For Windows/linux/mac(amd64)
1. Pull the docker image: ```docker pull rasanjana29/veriff-demo-api-tests:1.0.0-amd64```
2. Run the docker ```docker run -t -i -v ${PWD}/Veriff-api-test-reports:/api-test/target rasanjana29/veriff-demo-api-tests:1.0.0-amd64 mvn test -Dtest=testRunner```

For mac M1(arm64)
1. Pull the docker image: ```docker pull rasanjana29/veriff-demo-api-tests:1.0.0-arm64```
2. Run the docker ```docker run -t -i -v ${PWD}/Veriff-api-test-reports:/api-test/target rasanjana29/veriff-demo-api-tests:1.0.0-arm64 mvn test -Dtest=testRunner```

With the above command, a docker container will be created and tests will be executed in it. After the tests execution a report will be moved to your local machine. You can find this report in, 

```<current directory in terminal>/Veriff-api-test-reports/karate-reports/karate-summary.html```



<img width="1721" alt="Screenshot 2022-07-06 at 11 37 14 PM" src="https://user-images.githubusercontent.com/32265029/177615085-aacdbfef-7816-4554-adb1-d0d3dce5f4e7.png">
