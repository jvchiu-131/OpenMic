import { IsString, IsArray, IsNotEmpty, IsBoolean} from "class-validator";

export class CreateMusicianDto {

    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;


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
    @IsString()
    readonly contact: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly profileCompleted: boolean;

}