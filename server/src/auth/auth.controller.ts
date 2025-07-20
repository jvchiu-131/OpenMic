/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, UseGuards } from '@nestjs/common';
import { Body, Get, Req, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { SignupDto } from './dto/signup.dto';
import { NotificationGateway } from 'src/gateway/notifications.gateway';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    // Endpoint for user login

    @Post('signup')
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }
    
    // Uses the LocalStrategy guard to validate user credentials
    @Post('login')
    async login(@Body() authPayload: AuthPayloadDto) {
    const user = await this.authService.validateUser(authPayload);
        if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }
    return user;
}



    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request){
        console.log('inside authController status');
        // The user information is available in req.user due to JwtAuthGuard
        console.log('User information:', req.user);
        return req.user; // Return the user information
    }
}
