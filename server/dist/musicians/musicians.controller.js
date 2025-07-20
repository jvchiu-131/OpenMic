"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusiciansController = void 0;
const common_1 = require("@nestjs/common");
const musicians_service_1 = require("./musicians.service");
const CreateMusician_dto_1 = require("./dto/CreateMusician.dto");
const common_2 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("../auth/auth.service");
let MusiciansController = class MusiciansController {
    musiciansService;
    userService;
    authService;
    constructor(musiciansService, userService, authService) {
        this.musiciansService = musiciansService;
        this.userService = userService;
        this.authService = authService;
    }
    async createMusician(createMusicianDto, req) {
        const userId = req.user._id;
        await this.musiciansService.createMusician(userId, createMusicianDto);
        const updatedUser = await this.userService.getUserById(userId);
        if (!updatedUser) {
            throw new Error('User not found');
        }
        const newToken = this.authService.generateJwt(updatedUser);
        return {
            message: 'Musician registered successfully',
            musician: updatedUser,
            user: updatedUser,
            token: newToken,
        };
    }
    getMusicians() {
        return this.musiciansService.getMusicians();
    }
};
exports.MusiciansController = MusiciansController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_2.Post)('register'),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateMusician_dto_1.CreateMusicianDto, Object]),
    __metadata("design:returntype", Promise)
], MusiciansController.prototype, "createMusician", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MusiciansController.prototype, "getMusicians", null);
exports.MusiciansController = MusiciansController = __decorate([
    (0, common_1.Controller)('musicians'),
    __metadata("design:paramtypes", [musicians_service_1.MusiciansService,
        users_service_1.UsersService,
        auth_service_1.AuthService])
], MusiciansController);
//# sourceMappingURL=musicians.controller.js.map