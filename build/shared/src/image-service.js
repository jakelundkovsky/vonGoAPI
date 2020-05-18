"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const api_config_model_1 = require("./api-config-model");
const product_service_1 = require("./product-service");
const product_service_2 = require("./product-service");
const cognitiveservices_computervision_1 = require("@azure/cognitiveservices-computervision");
const ms_rest_js_1 = require("@azure/ms-rest-js");
function GetComputerVisionClient() {
    const credentials = new ms_rest_js_1.ApiKeyCredentials({
        inHeader: {
            'Ocp-Apim-Subscription-Key': api_config_model_1.ApiConfigModel.ProductionAzureComputerVisionKey,
        },
    });
    const computerVisionClient = new cognitiveservices_computervision_1.ComputerVisionClient(credentials, api_config_model_1.ApiConfigModel.ProductionAzureComputerVisionEndpoint);
    return computerVisionClient;
}
exports.GetComputerVisionClient = GetComputerVisionClient;
function GetBestItemMatches(products, result) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const keywords = {};
            for (const tag in result.tags) {
                const guessedItem = result.tags[tag].name;
                const guessedTerms = guessedItem.split(' ');
                for (let index = 0; index < guessedTerms.length; index++) {
                    const lowercaseGuessedTerm = guessedTerms[index].toLowerCase();
                    if (Object.prototype.hasOwnProperty.call(keywords, lowercaseGuessedTerm)) {
                        keywords[lowercaseGuessedTerm] = keywords[lowercaseGuessedTerm] + 1;
                    }
                    else {
                        keywords[lowercaseGuessedTerm] = 1;
                    }
                }
            }
            for (const tag in result.description.tags) {
                const guessedItem = result.description.tags[tag].toLowerCase();
                if (Object.prototype.hasOwnProperty.call(keywords, guessedItem)) {
                    keywords[guessedItem] = keywords[guessedItem] + 1;
                }
                else {
                    keywords[guessedItem] = 1;
                }
            }
            for (const brand in result.brands) {
                const guessedBrand = result.brands[brand].name.toLowerCase();
                if (Object.prototype.hasOwnProperty.call(keywords, guessedBrand)) {
                    keywords[guessedBrand] = keywords[guessedBrand] + 1;
                }
                else {
                    keywords[guessedBrand] = 1;
                }
            }
            let bestMatch = 0;
            let bestId = '';
            const guesses = [];
            for (const i in products.resource) {
                const product = products.resource[i];
                let currMatch = 0;
                if (product.title != null && product.title !== '') {
                    const titleWords = product.title.split(' ');
                    for (let index = 0; index < titleWords.length; index++) {
                        const word = titleWords[index].toLowerCase();
                        if (Object.prototype.hasOwnProperty.call(keywords, word)) {
                            currMatch = currMatch + keywords[word];
                        }
                    }
                }
                if (product.description != null && product.description !== '') {
                    const descriptionWords = product.description.split(' ');
                    for (let index = 0; index < descriptionWords.length; index++) {
                        const word = descriptionWords[index].toLowerCase();
                        if (Object.prototype.hasOwnProperty.call(keywords, word)) {
                            currMatch = currMatch + keywords[word];
                        }
                    }
                }
                if (currMatch > bestMatch) {
                    bestMatch = currMatch;
                    bestId = product.id;
                    const bestGuess = yield product_service_1.GetProduct(bestId);
                    if (!bestGuess) {
                        throw new Error('Item not found!');
                    }
                    guesses.push(bestGuess);
                }
            }
            if (bestId === '') {
                throw new Error('Item not found!');
            }
            let final = {
                id: "",
                resource: [],
                correlationId: "",
                created: new Date(),
                href: "",
                length: 0,
                message: "",
                isSuccess: false
            };
            for (let i = 0; i < guesses.length; i++) {
                final.resource.push(guesses[i]);
                final.length = final.length + 1;
                final.isSuccess = true;
            }
            return final;
        }
        catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    });
}
exports.GetBestItemMatches = GetBestItemMatches;
function MatchItemUrl(imageUrl) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield product_service_2.GetProducts();
            const computerVisionClient = GetComputerVisionClient();
            const result = yield computerVisionClient.analyzeImage(imageUrl, {
                visualFeatures: ['Brands', 'Description', 'Tags'],
            });
            let matches = yield GetBestItemMatches(products, result);
            return matches;
        }
        catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    });
}
exports.MatchItemUrl = MatchItemUrl;
function MatchItemUpload(requestBody) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield product_service_2.GetProducts();
            const computerVisionClient = GetComputerVisionClient();
            const result = yield computerVisionClient.analyzeImageInStream(requestBody, { visualFeatures: ['Brands', 'Description', 'Tags'] });
            let matches = yield GetBestItemMatches(products, result);
            return matches;
        }
        catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    });
}
exports.MatchItemUpload = MatchItemUpload;
//# sourceMappingURL=image-service.js.map