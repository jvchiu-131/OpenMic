import { Model, Types } from 'mongoose';
import { Musician, MusicianDocument } from './schemas/musician.schema';
import { User } from 'src/users/schemas/user.schema';
import { CreateMusicianDto } from './dto/CreateMusician.dto';
export declare class MusiciansService {
    private musicianModel;
    private userModel;
    constructor(musicianModel: Model<MusicianDocument>, userModel: Model<User>);
    createMusician(userId: string, createMusicianDto: CreateMusicianDto): Promise<Musician>;
    getMusicians(): Promise<Musician[]>;
    getMusicianById(id: string): Promise<(import("mongoose").Document<unknown, {}, MusicianDocument> & Musician & import("mongoose").Document<unknown, any, any> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateMusician(id: string, updateMusicianDto: CreateMusicianDto): Promise<(import("mongoose").Document<unknown, {}, MusicianDocument> & Musician & import("mongoose").Document<unknown, any, any> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    deleteMusician(id: string): Promise<(import("mongoose").Document<unknown, {}, MusicianDocument> & Musician & import("mongoose").Document<unknown, any, any> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
