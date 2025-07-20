import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { Musician } from '../musicians/schemas/musician.schema';
import { Client } from '../clients/schemas/client.schema';
import { SignupDto } from './dto/signup.dto';
export declare class AuthService {
    private userModel;
    private musicianModel;
    private clientModel;
    private jwtService;
    constructor(userModel: Model<User>, musicianModel: Model<Musician>, clientModel: Model<Client>, jwtService: JwtService);
    generateJwt(user: User): string;
    validateUser({ username, password, email }: AuthPayloadDto): Promise<{
        token: string;
        email: string;
        username: string;
        password: string;
        role: "musician" | "client";
        profileCompleted: boolean;
        createdAt: Date;
        _id: unknown;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    } | null>;
    signup(signupDto: SignupDto): Promise<{
        message: string;
    }>;
}
