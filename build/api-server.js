"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const products_1 = require("./routes/products");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const orders_1 = require("./routes/orders");
const payment_1 = require("./routes/payment");
const image_1 = require("./routes/image");
class ApiServer extends core_1.Server {
    constructor() {
        super(true);
        this.SERVER_STARTED = 'Api server started on port: ';
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.setupControllers();
    }
    setupControllers() {
        const ctlrInstances = [
            new products_1.ProductRoute(),
            new orders_1.OrderRoute(),
            new payment_1.PaymentRoute(),
            new image_1.ImageRoute()
        ];
        super.addControllers(ctlrInstances);
    }
    start(port) {
        this.app.get('*', (_req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            logger_1.Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}
exports.default = ApiServer;
//# sourceMappingURL=api-server.js.map