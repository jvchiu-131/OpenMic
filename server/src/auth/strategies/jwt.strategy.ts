/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';

interface JwtPayload {
    _id: string;
    email: string;
    username: string;
    role: string;
    profileCompleted: boolean; 
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'abc123', // This should match the secret used in JwtModule.register
        });
    }

    validate(payload: JwtPayload) {
        return {
            _id: payload._id,
            email: payload.email,
            username: payload.username,
            role: payload.role,
            profileCompleted: payload.profileCompleted, 
        };
    }
}

