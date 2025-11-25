import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsOptional,
} from 'class-validator';

export class SignUpDTO {

    @IsNotEmpty()
    @IsString()
    @MaxLength(45)
    firstName: string;
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(45)
    lastName: string;
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(16)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(40)
    password: string;
}