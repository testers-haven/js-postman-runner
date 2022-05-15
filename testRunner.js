require('dotenv').config();
const newman = require('newman');
const {reportToAllure} = require("allure-service-client");
const {resolve} = require("path");

let options = {
    project: 'postman-poc',
    resultsFolder: resolve(__dirname, './allure-results'),
    cleanupFilesAfterUpload: true,
    host: process.env.ALLURE_HOST,
    security: {
        username: process.env.ALLURE_USERNAME,
        password: process.env.ALLURE_PASSWORD
    }
};

newman.run({
    collection: require(`./collections/collection.json`),
    environment: require(`./environments/staging.json`),
    reporters: ['cli','testrail', 'allure']
}).on('done',async function () {
    await reportToAllure(options);
    if (this.summary.run.failures.length > 0) {
        console.error('There were failures in the tests');
        process.exit(1);
    }
    else {
        console.log('collection run completed succesfully.');
        process.exit(0);
    }
});