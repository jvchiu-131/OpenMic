import { MusiciansService } from './musicians.service';
import { CreateMusicianDto } from './dto/CreateMusician.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
export declare class MusiciansController {
    private readonly musiciansService;
    private readonly userService;
    private readonly authService;
    constructor(musiciansService: MusiciansService, userService: UsersService, authService: AuthService);
    createMusician(createMusicianDto: CreateMusicianDto, req: any): Promise<{
        message: string;
        musician: import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").User> & import("../users/schemas/user.schema").User & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        user: import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").User> & import("../users/schemas/user.schema").User & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        token: string;
    }>;
    getMusicians(): Promise<import("./schemas/musician.schema").Musician[]>;
}
