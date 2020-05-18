"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const image_service_1 = require("../shared/src/image-service");
const multer = require("multer");
const os = require("os");
const fs = require("fs");
const path = os.tmpdir();
const body = multer({ dest: path });
let ImageRoute = class ImageRoute {
    GetImageUrl(_req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield image_service_1.MatchItemUrl("https://images.unsplash.com/photo-1504630083234-14187a9df0f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80");
                res.status(200).json(results);
            }
            catch (e) {
                logger_1.Logger.Err(e, true);
                res.status(400).json(e);
            }
        });
    }
    GetImageLocal(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let image = req.files[0];
                let stream = fs.readFileSync(image.path);
                const results = yield image_service_1.MatchItemUpload(stream);
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
], ImageRoute.prototype, "GetImageUrl", null);
tslib_1.__decorate([
    core_1.Post(),
    core_1.Middleware(body.any()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ImageRoute.prototype, "GetImageLocal", null);
ImageRoute = tslib_1.__decorate([
    core_1.Controller("api/image")
], ImageRoute);
exports.ImageRoute = ImageRoute;
//# sourceMappingURL=image.js.map