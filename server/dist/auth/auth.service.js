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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const musician_schema_1 = require("../musicians/schemas/musician.schema");
const client_schema_1 = require("../clients/schemas/client.schema");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    userModel;
    musicianModel;
    clientModel;
    jwtService;
    constructor(userModel, musicianModel, clientModel, jwtService) {
        this.userModel = userModel;
        this.musicianModel = musicianModel;
        this.clientModel = clientModel;
        this.jwtService = jwtService;
    }
    generateJwt(user) {
        const payload = {
            username: user.username,
            sub: user._id,
            email: user.email,
            role: user.role,
            profileCompleted: user.profileCompleted,
        };
        return this.jwtService.sign(payload);
    }
    async validateUser({ username, password, email }) {
        if (!username && !email) {
            console.log('No username or email provided');
            return null;
        }
        const findUser = await this.userModel.findOne({
            $or: [
                ...(email ? [{ email }] : []),
                ...(username ? [{ username }] : [])
            ]
        });
        if (!findUser) {
            console.log('User not found');
            return null;
        }
        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) {
            console.log('Password mismatch');
            return null;
        }
        const userObj = findUser.toObject();
        const token = this.jwtService.sign(userObj);
        console.log('Login success. Token:', token);
        return { ...userObj, token };
    }
    async signup(signupDto) {
        const { username, password, email, role } = signupDto;
        const emailExists = await this.userModel.findOne({ email });
        if (emailExists) {
            throw new Error('Email already exists');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            username,
            email,
            password: hashPassword,
            role,
            profileCompleted: false,
            createdAt: Date.now(),
        });
        if (role === 'musician') {
            await this.musicianModel.create({
                username,
                email,
                password: hashPassword,
                role,
                profileCompleted: false,
                createdAt: Date.now(),
            });
        }
        else if (role === 'client') {
            await this.clientModel.create({
                username,
                email,
                password: hashPassword,
                role,
                profileCompleted: false,
                createdAt: Date.now(),
            });
        }
        return { message: 'Signup successful' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(musician_schema_1.Musician.name)),
    __param(2, (0, mongoose_1.InjectModel)(client_schema_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map