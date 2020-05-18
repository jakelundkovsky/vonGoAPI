"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const api_config_model_1 = require("./api-config-model");
const axios_1 = require("axios");
const ordersUrl = `${api_config_model_1.ApiConfigModel.StagingUrl}/issuer/${api_config_model_1.ApiConfigModel.StagingIssuerId}/orders`;
function GetOrders() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(ordersUrl);
        return response.data;
    });
}
exports.GetOrders = GetOrders;
function GetOrder(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const orderUrl = `${ordersUrl}/${id}`;
        const response = yield axios_1.default.get(orderUrl);
        return response.data;
    });
}
exports.GetOrder = GetOrder;
function AddProductToOrder(id, product) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const orderUrl = `${ordersUrl}/${id}/add-products`;
        const data = [
            {
                productId: product.id,
                quantity: 1,
            },
        ];
        const response = yield axios_1.default.post(orderUrl, data);
        return response.data;
    });
}
exports.AddProductToOrder = AddProductToOrder;
function AddProductsToOrder(id, products) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const orderUrl = `${ordersUrl}/${id}/add-products`;
        const data = [];
        products.forEach(element => data.push({ productId: element.id, quantity: 1 }));
        const response = yield axios_1.default.post(orderUrl, data);
        return response.data;
    });
}
exports.AddProductsToOrder = AddProductsToOrder;
function CreateEmptyOrder() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const orderUrl = `${ordersUrl}`;
        const data = {};
        const response = yield axios_1.default.post(orderUrl, data);
        return response.data;
    });
}
exports.CreateEmptyOrder = CreateEmptyOrder;
function RemoveProductsFromOrder(id, products) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const orderUrl = `${ordersUrl}/${id}/remove-products`;
        const data = [];
        products.forEach(element => data.push({ productId: element.id, quantity: 1 }));
        const response = yield axios_1.default.post(orderUrl, data);
        return response.data;
    });
}
exports.RemoveProductsFromOrder = RemoveProductsFromOrder;
function RemoveProductFromOrder(id, product) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const orderUrl = `${ordersUrl}/${id}/remove-products`;
        const data = [
            {
                productId: product.id,
                quantity: 1,
            },
        ];
        const response = yield axios_1.default.post(orderUrl, data);
        return response.data;
    });
}
exports.RemoveProductFromOrder = RemoveProductFromOrder;
function AddPaymentToOrder(id, payment) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const orderUrl = `${ordersUrl}/${id}/payments`;
        const response = yield axios_1.default.post(orderUrl, payment);
        return response.data;
    });
}
exports.AddPaymentToOrder = AddPaymentToOrder;
//# sourceMappingURL=order-service.js.map