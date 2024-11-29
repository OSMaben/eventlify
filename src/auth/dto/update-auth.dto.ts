import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import {IsEmail, IsNumber, IsOptional, IsString, MinLength} from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    password?: string;


    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string;


    @IsOptional()
    @IsNumber()
    phone?: string;
}
