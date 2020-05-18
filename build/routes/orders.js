"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const order_service_1 = require("../shared/src/order-service");
let OrderRoute = class OrderRoute {
    GetOrders(_req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield order_service_1.GetOrders();
                res.status(200).json(results);
            }
            catch (e) {
                logger_1.Logger.Err(e, true);
                res.status(400).json(e);
            }
        });
    }
    CreateEmptyOrder(_req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield order_service_1.CreateEmptyOrder();
                res.status(200).json(results);
            }
            catch (e) {
                logger_1.Logger.Err(e, true);
                res.status(400).json(e);
            }
        });
    }
    GetOrder(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield order_service_1.GetOrder(req.params.id);
                res.status(200).json(results);
            }
            catch (e) {
                logger_1.Logger.Err(e, true);
                res.status(400).json(e);
            }
        });
    }
    AddProduct(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield order_service_1.AddProductToOrder(req.params.id, {
                    id: req.params.productId,
                });
                res.status(200).json(results);
            }
            catch (error) {
                logger_1.Logger.Err(error, true);
                res.status(400).json(error);
            }
        });
    }
    RemoveProduct(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield order_service_1.RemoveProductFromOrder(req.params.id, {
                    id: req.params.productId,
                });
                res.status(200).json(results);
            }
            catch (error) {
                logger_1.Logger.Err(error, true);
                res.status(400).json(error.message);
            }
        });
    }
};
tslib_1.__decorate([
    core_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderRoute.prototype, "GetOrders", null);
tslib_1.__decorate([
    core_1.Get("create-empty"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderRoute.prototype, "CreateEmptyOrder", null);
tslib_1.__decorate([
    core_1.Get(":id"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderRoute.prototype, "GetOrder", null);
tslib_1.__decorate([
    core_1.Get(":id/add-product/:productId"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderRoute.prototype, "AddProduct", null);
tslib_1.__decorate([
    core_1.Get(":id/remove-product/:productId"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderRoute.prototype, "RemoveProduct", null);
OrderRoute = tslib_1.__decorate([
    core_1.Controller("api/orders")
], OrderRoute);
exports.OrderRoute = OrderRoute;
//# sourceMappingURL=orders.js.map