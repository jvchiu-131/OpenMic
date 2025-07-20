"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusiciansModule = void 0;
const common_1 = require("@nestjs/common");
const musicians_service_1 = require("./musicians.service");
const musicians_controller_1 = require("./musicians.controller");
const mongoose_1 = require("@nestjs/mongoose");
const musician_schema_1 = require("./schemas/musician.schema");
const users_module_1 = require("../users/users.module");
let MusiciansModule = class MusiciansModule {
};
exports.MusiciansModule = MusiciansModule;
exports.MusiciansModule = MusiciansModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: musician_schema_1.Musician.name,
                    schema: musician_schema_1.MusicianSchema
                }
            ]),
            users_module_1.UsersModule
        ],
        controllers: [musicians_controller_1.MusiciansController],
        providers: [musicians_service_1.MusiciansService],
        exports: [musicians_service_1.MusiciansService]
    })
], MusiciansModule);
//# sourceMappingURL=musicians.module.js.map