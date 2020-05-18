import * as bodyParser from 'body-parser';
import { ProductRoute } from './routes/products';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { OrderRoute } from './routes/orders';
import { PaymentRoute } from './routes/payment';
import { ImageRoute } from './routes/image';

class ApiServer extends Server {

    private readonly SERVER_STARTED = 'Api server started on port: ';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
    }

    private setupControllers(): void {

        const ctlrInstances = [
            new ProductRoute(),
            new OrderRoute(),
            new PaymentRoute(),
            new ImageRoute()
        ];

        super.addControllers(ctlrInstances);
    }

    public start(port: number): void {
        this.app.get('*', (_req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default ApiServer;
