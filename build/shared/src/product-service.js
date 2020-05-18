"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const api_config_model_1 = require("./api-config-model");
const axios_1 = require("axios");
const productsUrl = `${api_config_model_1.ApiConfigModel.StagingUrl}/issuer/${api_config_model_1.ApiConfigModel.StagingIssuerId}/products`;
function GetProducts() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(productsUrl);
        return response.data;
    });
}
exports.GetProducts = GetProducts;
function GetProduct(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const productUrl = `${productsUrl}/${id}`;
        const response = yield axios_1.default.get(productUrl);
        return response.data;
    });
}
exports.GetProduct = GetProduct;
//# sourceMappingURL=product-service.js.map