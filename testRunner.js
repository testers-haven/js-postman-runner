require('dotenv').config();
const newman = require('newman');
const {reportToAllure} = require("allure-service-client");
const {resolve} = require("path");
const {PostmanClient} = require("./postman-client");
const argv = require('minimist')(process.argv.slice(2));

let collectionName = argv.collection;
if (!collectionName) {
    console.log(
        'Pass correct collection name as an argument e.g: npm test -- --collection=LoginPage --testEnv=staging\n',
    );
    process.exit(0);
}
let environmentName = argv.testEnv;
if (!environmentName) {
    console.log(
        'Pass correct testEnv name as an argument e.g: npm test -- --collection=LoginPage --testEnv=staging\n',
    );
    process.exit(0);
}
let apiKey = argv.apiKey;
if (!apiKey) {
    console.log(
        'Pass correct apiKey name as an argument e.g: npm test -- --collection=LoginPage --testEnv=staging --apiKey=yourApiKey\n',
    );
    process.exit(0);
}

main(collectionName, environmentName, apiKey);

async function main(collectionName, environmentName, apiKey) {

    let postmanClientOptions = {
        host: 'https://api.getpostman.com/',
        apiKey: apiKey
    }

    let pmClient = new PostmanClient(postmanClientOptions);
    let collections = await pmClient.getCollections();
    let collectionUID = collections.data.collections.find(collection => collection.name.includes(collectionName)).uid;
    let environments = await pmClient.getEnvironments();
    let environmentUID = environments.data.environments.find(environment => environment.name.includes(environmentName)).uid;

    let collection = (await pmClient.getCollection(collectionUID)).data.collection;
    let environment = (await pmClient.getEnvironment(environmentUID)).data.environment;

    await newman.run({
        collection: collection,
        environment: environment,
        reporters: ['cli', 'allure'],
    }).on('done',async function () {
        // allure options
        let allureOptions = {
            project: 'postman-poc',
            resultsFolder: resolve(__dirname, './allure-results'),
            cleanupFilesAfterUpload: true,
            host: process.env.ALLURE_HOST
        };

        await reportToAllure(allureOptions);
    });
}

