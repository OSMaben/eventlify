import {IsString, IsNotEmpty, MinLength, IsEmail, IsNumber} from 'class-validator';

export class LoginAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;




}
