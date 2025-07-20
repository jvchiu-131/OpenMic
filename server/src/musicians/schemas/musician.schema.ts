import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()

export class Musician extends Document {

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

