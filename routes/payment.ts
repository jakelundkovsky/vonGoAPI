import { Request, Response } from "express";
import { Controller, Get } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { PayForOrder } from "../shared/src/payment-service";
import { GetOrder } from "../shared/src/order-service";

@Controller("api/payment")
export class PaymentRoute {
  @Get(":orderId/:walletAddress/:privateKey")
  private async PayOrder(req: Request, res: Response) {
    try {
      const order = await GetOrder(req.params.orderId);
      console.log(order);
      const results = await PayForOrder(
        order,
        req.params.walletAddress,
        req.params.privateKey
      );
      res.status(200).json(results);
    } catch (e) {
      Logger.Err(e, true);
      res.status(400).json(e);
    }
  }
}
