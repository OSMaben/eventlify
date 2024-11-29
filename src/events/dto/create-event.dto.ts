import { IsNotEmpty, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateEventDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description: string;

    @IsDateString()
    date: string;

    @IsOptional()
    location: string;

    @IsOptional()
    @IsNumber()
    participants: number;
}

