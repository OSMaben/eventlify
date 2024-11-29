import {IsMongoId, IsNotEmpty} from "class-validator";

export class CreateUserDto {

    @IsMongoId()
    @IsNotEmpty()
    userId: string;
}
