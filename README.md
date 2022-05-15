# postman-poc
Proof of concept on how to run command line tests with postman

## System requirements
* Node v12+

## Installation
* `npm install`

## Setting up
* To use the poc you will need to:
  * Add the collection files into the collections folder
  * Add the environment files into the environments folder
  * In testRunner.js add the collection and environment path of the tests to be tested
* For allure and testrail you will need to add the environment variables specified in the .env.sample, if not results wont be pushed (you can create a .env file to use it locally)

## Usage
* `npm test`

## Reporting
* **CLI ->** Default reporter that output the results into the console
* **Testrail ->** Integration that outputs the test results into Testrail.
* **Allure ->** Integration that generate the allure result files to send them to the server

## LINKS
* Testrail
    - https://www.npmjs.com/package/newman-reporter-testrail
    - https://github.com/billylam/newman-reporter-testrail
    - https://medium.com/apis-with-valentine/how-to-integrate-testrail-with-postman-newman-api-tests-cc0380998d04
* Allure
    - https://www.npmjs.com/package/newman-reporter-allure
    - https://github.com/ervirendersingh/newman-reporter-allure
* Postman testcase scripting
    - https://learning.postman.com/docs/writing-scripts/script-references/test-examples/
    - https://learning.postman.com/docs/writing-scripts/test-scripts/
    - https://github.com/aturkdogan/parallel_run_via_postman/tree/9c5f7605d6d3211303baed0057d99248db76c12a