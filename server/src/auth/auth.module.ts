import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Musician, MusicianSchema } from 'src/musicians/schemas/musician.schema';
import { Client, ClientSchema } from 'src/clients/schemas/client.schema'; 

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'abc123',
            signOptions: { expiresIn: '1h' } 
        }),
         MongooseModule.forFeature([
        { name: User.name, schema: UserSchema },
        { name: Musician.name, schema: MusicianSchema },
        { name: Client.name, schema: ClientSchema }, 
    ]),

    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [
    MongooseModule ,
    AuthService
  ]
})
export class AuthModule {}
