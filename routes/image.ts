import { Request, Response } from "express";
import { Controller, Get, Post, Middleware } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { MatchItemUrl, MatchItemUpload } from "../shared/src/image-service";
import * as multer from "multer";
import * as os from "os";
import * as fs from "fs";

const path = os.tmpdir();
const body = multer({ dest: path });

@Controller("api/image")
export class ImageRoute {
  @Get()
  private async GetImageUrl(_req: Request, res: Response) {
    try {
      /**
       * https://images.emoney.com/05bce4bc1eac4fb987906b2e0a6769cb-array.png (starbucks)
       * https://images.emoney.com/7768d67bd9eb4960814c89d6f5e9e15b-array.png (zyn)
       * https://images.emoney.com/8546dbafeaab4aa7992e48e318baaa1a-array.png (coke)
       * https://images.emoney.com/0d592e164fd342c28a00423a57b50724-array.png (glade)
       * https://images.emoney.com/103a505401d34efbb5b16a974de5d390-array.png (headphones)
       * https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg (cat)
       */

      const results = await MatchItemUrl(
        "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
      );

      res.status(200).json(results);
    } catch (e) {
      Logger.Err(e, true);
      res.status(400).json(e);
    }
  }

  @Post()
  @Middleware(body.any())
  private async GetImageLocal(req: Request, res: Response) {
    try {

      let image = req.files[0];
      let stream = fs.readFileSync(image.path);

      const results = await MatchItemUpload(stream);
      res.status(200).json(results);
    } catch (e) {
      Logger.Err(e, true);
      res.status(400).json(e);
    }
  }
}
