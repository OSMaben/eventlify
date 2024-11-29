import {IsString, IsNotEmpty, MinLength, IsEmail, IsNumber} from 'class-validator';

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;


    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNumber()
    @IsNotEmpty()
    @IsNumber()
    readonly phone: string;

    @IsString()
    readonly role: string;
}
