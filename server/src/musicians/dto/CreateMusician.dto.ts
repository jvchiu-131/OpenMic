import { IsString, IsEmail, IsArray, IsNotEmpty, IsNumber} from "class-validator";

export class CreateMusicianDto {

    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsArray()
    readonly genres: string[];

    @IsNotEmpty()
    @IsArray()
    readonly instruments: string[];

    @IsNotEmpty()
    @IsString()
    readonly profilePic: string;
    
    @IsNotEmpty()
    @IsNumber()
    readonly contact: number;

}