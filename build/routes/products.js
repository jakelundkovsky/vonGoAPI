"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const product_service_1 = require("../shared/src/product-service");
let ProductRoute = class ProductRoute {
    GetProducts(_req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield product_service_1.GetProducts();
                res.status(200).json(results);
            }
            catch (e) {
                logger_1.Logger.Err(e, true);
                res.status(400).json(e);
            }
        });
    }
    GetProduct(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield product_service_1.GetProduct(req.params.id);
                res.status(200).json(results);
            }
            catch (e) {
                logger_1.Logger.Err(e, true);
                res.status(400).json(e);
            }
        });
    }
};
tslib_1.__decorate([
    core_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductRoute.prototype, "GetProducts", null);
tslib_1.__decorate([
    core_1.Get(":id"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductRoute.prototype, "GetProduct", null);
ProductRoute = tslib_1.__decorate([
    core_1.Controller("api/products")
], ProductRoute);
exports.ProductRoute = ProductRoute;
//# sourceMappingURL=products.js.map