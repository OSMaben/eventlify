import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Model} from "mongoose";
import {User, UserDocument} from "./user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {CreateAuthDto} from "../auth/dto/create-auth.dto";


@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {}


 async findByEmail(email: string): Promise<User> {
    try {
        const user = await this.usersModel.findOne({ email });
        return user;
    }catch (error)
    {
        throw new error;
    }
  }


 async create(createAuthDto: CreateAuthDto): Promise<User> {
    try {
        const newUser = new this.usersModel(createAuthDto);
        return newUser.save();
    }catch (error)
    {
        throw new error;
    }

  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
