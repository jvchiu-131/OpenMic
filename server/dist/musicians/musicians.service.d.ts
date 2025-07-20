import { Model } from 'mongoose';
import { Musician } from './schemas/musician.schema';
import { User } from 'src/users/schemas/user.schema';
import { CreateMusicianDto } from './dto/CreateMusician.dto';
export declare class MusiciansService {
    private musicianModel;
    private userModel;
    constructor(musicianModel: Model<Musician>, userModel: Model<User>);
    createMusician(createMusicianDto: CreateMusicianDto): Promise<Musician>;
    getMusicians(): Promise<Musician[]>;
    getMusicianById(id: string): Promise<(import("mongoose").Document<unknown, {}, Musician> & Musician & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateMusician(id: string, updateMusicianDto: CreateMusicianDto): Promise<(import("mongoose").Document<unknown, {}, Musician> & Musician & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteMusician(id: string): Promise<(import("mongoose").Document<unknown, {}, Musician> & Musician & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
