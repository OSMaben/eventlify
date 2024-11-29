import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtValidator} from "../Middlewares/jwt.validator";

@Module({

  imports:[
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: '@kf)$gh><0212', // Make sure to replace with a proper secret
      signOptions: { expiresIn: '60m' }, // Customize the expiration time if needed
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService,JwtValidator],
})
export class AuthModule {}