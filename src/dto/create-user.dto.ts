import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator"

export class CreateUserDto{

    @IsEmail()
    email : string  

    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[^ ]{8,}$/) // for strong 
    @MinLength(8)
    password : string
}

