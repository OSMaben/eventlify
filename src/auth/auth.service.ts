import {HttpException, Injectable} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {UsersService} from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

  constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
  ) {}



  async  register(createAuthDto: CreateAuthDto) {

    try {
        const {username, password, email, phone,role} = createAuthDto;

        const user = await this.usersService.findByEmail(email);
        if(user)
            throw new HttpException('User already exists', 400);

        const HashPassword = await  bcrypt.hash(password, 10);

        const createUser = await this.usersService.create(
            {
                username,
                password: HashPassword,
                email,
                phone,
                role
            }
        );

        const payload = { sub: createUser.username, email: createUser.email, phone: createUser.phone };

        const  accessToken = this.jwtService.sign(payload);


        return  {
            user: createUser,
            accessToken: accessToken,
        }
    }catch (error) {
        throw error;
    }
  }





  async  login(loginAuthDto: LoginAuthDto) {

      try {
          const {email, password} = loginAuthDto;

          const user = await this.usersService.findByEmail(email);
          if (!user) {
              throw new HttpException('Invalid email or password', 401);
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
              throw new HttpException('Invalid email or password', 401);
          }

          const payload = { sub: user.username, email: user.email, phone: user.phone, role: user.role };
          const accessToken = this.jwtService.sign(payload);


          return {
              user: {
                  username: user.username,
                  phone: user.phone,
                  email: user.email,
                  role: user.role,
              },
              accessToken,
          };
      }catch (error) {
          throw error;
      }
  }


}
