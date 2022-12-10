const axios = require('axios').default;

class PostmanClient {

    constructor(options) {
        this.apiKey = options.apiKey;
        axios.defaults.baseURL = options.host;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['accept'] = '*/*';
        axios.defaults.maxContentLength = Infinity;
        axios.defaults.maxBodyLength = Infinity;
    }

    async getCollections() {
        return await axios.get(`/collections?apikey=${this.apiKey}`);
    }

    async getEnvironments() {
        return await axios.get(`/environments?apikey=${this.apiKey}`);
    }

    async getCollection(uid) {
        return await axios.get(`/collections/${uid}?apikey=${this.apiKey}`);
    }

    async getEnvironment(uid) {
        return await axios.get(`/environments/${uid}?apikey=${this.apiKey}`);
    }
}

module.exports = {PostmanClient}