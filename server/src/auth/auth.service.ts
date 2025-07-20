/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User} from '../users/schemas/user.schema';
import { Musician } from '../musicians/schemas/musician.schema';
import { Client } from '../clients/schemas/client.schema';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { profile } from 'console';



// AuthService handles user authentication and signup
// It validates user credentials and creates new users in the database
@Injectable()
export class AuthService {

    constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Musician.name) private musicianModel: Model<Musician>,
    @InjectModel(Client.name) private clientModel: Model<Client>,
    private jwtService: JwtService
    ) {}

    generateJwt(user:User) {
        const payload = { 
          username: user.username, 
          sub: user._id,
          email: user.email,
          role: user.role,
          profileCompleted: user.profileCompleted,
        };
        return this.jwtService.sign(payload);
    }

    async validateUser({ username, password, email }: AuthPayloadDto) {
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




    async signup(signupDto: SignupDto) {
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

     // Create role-specific profile
    if (role === 'musician') {
        await this.musicianModel.create({
            username,
            email,
            password: hashPassword,
            role,
            profileCompleted: false,
            createdAt: Date.now(),
    });
    } else if (role === 'client') {
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

}


