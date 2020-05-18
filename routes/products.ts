import { Request, Response } from "express";
import { Controller, Get } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { GetProducts, GetProduct } from "../shared/src/product-service";

@Controller("api/products")
export class ProductRoute {
  @Get()
  private async GetProducts(_req: Request, res: Response) {
    try {
      const results = await GetProducts();
      res.status(200).json(results);
    } catch (e) {
      Logger.Err(e, true);
      res.status(400).json(e);
    }
  }

  @Get(":id")
  private async GetProduct(req: Request, res: Response) {
    try {
      const results = await GetProduct(req.params.id);
      res.status(200).json(results);
    } catch (e) {
      Logger.Err(e, true);
      res.status(400).json(e);
    }
  }
}
