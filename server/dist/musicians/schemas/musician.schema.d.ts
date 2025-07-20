import { Document, Types } from "mongoose";
export type MusicianDocument = Musician & Document;
export declare class Musician {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    genres: string[];
    instruments: string[];
    profileCompleted: boolean;
    contact: string;
    profilePic: string;
}
export declare const MusicianSchema: import("mongoose").Schema<Musician, import("mongoose").Model<Musician, any, any, any, Document<unknown, any, Musician> & Musician & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Musician, Document<unknown, {}, import("mongoose").FlatRecord<Musician>> & import("mongoose").FlatRecord<Musician> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
