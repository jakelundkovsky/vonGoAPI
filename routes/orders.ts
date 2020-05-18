import { Request, Response } from "express";
import { Controller, Get } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import {
  GetOrders,
  GetOrder,
  AddProductToOrder,
  RemoveProductFromOrder,
  CreateEmptyOrder,
} from "../shared/src/order-service";

@Controller("api/orders")
export class OrderRoute {
  @Get()
  private async GetOrders(_req: Request, res: Response) {
    try {
      const results = await GetOrders();
      res.status(200).json(results);
    } catch (e) {
      Logger.Err(e, true);
      res.status(400).json(e);
    }
  }

  @Get("create-empty")
  private async CreateEmptyOrder(_req: Request, res: Response) {
    try {
      const results = await CreateEmptyOrder();

      res.status(200).json(results);
    } catch (e) {
      Logger.Err(e, true);
      res.status(400).json(e);
    }
  }

  @Get(":id")
  private async GetOrder(req: Request, res: Response) {
    try {
      const results = await GetOrder(req.params.id);
      res.status(200).json(results);
    } catch (e) {
      Logger.Err(e, true);
      res.status(400).json(e);
    }
  }

  @Get(":id/add-product/:productId")
  private async AddProduct(req: Request, res: Response) {
    try {
      const results = await AddProductToOrder(req.params.id, {
        id: req.params.productId,
      });
      res.status(200).json(results);
    } catch (error) {
      Logger.Err(error, true);
      res.status(400).json(error);
    }
  }

  @Get(":id/remove-product/:productId")
  private async RemoveProduct(req: Request, res: Response) {
    try {
      const results = await RemoveProductFromOrder(req.params.id, {
        id: req.params.productId,
      });

      res.status(200).json(results);
    } catch (error) {
      Logger.Err(error, true);
      res.status(400).json(error.message);
    }
  }
}
