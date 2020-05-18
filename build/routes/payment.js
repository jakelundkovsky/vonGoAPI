"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const payment_service_1 = require("../shared/src/payment-service");
const order_service_1 = require("../shared/src/order-service");
let PaymentRoute = class PaymentRoute {
    PayOrder(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield order_service_1.GetOrder(req.params.orderId);
                console.log(order);
                const results = yield payment_service_1.PayForOrder(order, req.params.walletAddress, req.params.privateKey);
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
    core_1.Get(":orderId/:walletAddress/:privateKey"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentRoute.prototype, "PayOrder", null);
PaymentRoute = tslib_1.__decorate([
    core_1.Controller("api/payment")
], PaymentRoute);
exports.PaymentRoute = PaymentRoute;
//# sourceMappingURL=payment.js.map