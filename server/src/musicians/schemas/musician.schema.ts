import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type MusicianDocument = Musician & Document;

@Schema()

export class Musician{

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    _id: Types.ObjectId;

    @Prop({ required: true, type: String })
    firstName: string;

    @Prop({ required: true, type: String })
    lastName: string;

    @Prop({ required: true })
    genres: string[];

    @Prop({required: true})
    instruments: string[];

    @Prop({ default: false })
    profileCompleted: boolean;

    @Prop({ required: true, type: String })
    contact: string;

    @Prop({ required: true, type: String })
    profilePic: string;
}

export const MusicianSchema = SchemaFactory.createForClass(Musician);

