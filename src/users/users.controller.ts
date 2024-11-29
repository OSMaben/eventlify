import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {CreateAuthDto} from "../auth/dto/create-auth.dto";
import {IsAdminGuard} from "../Middlewares/isAdmin.middleware";
import {JwtAuthGuard} from "../Guards/jwt-auth.guard";
import {JwtValidator} from "../Middlewares/jwt.validator";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/createUser')
  @UseGuards(JwtAuthGuard,JwtValidator,IsAdminGuard)
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.usersService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
