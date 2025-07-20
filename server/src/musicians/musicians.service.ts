import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Musician, MusicianDocument } from './schemas/musician.schema';
import { User } from 'src/users/schemas/user.schema';

import { CreateMusicianDto } from './dto/CreateMusician.dto';

@Injectable()
export class MusiciansService {

    constructor(
        @InjectModel(Musician.name) private musicianModel: Model<MusicianDocument>,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}
     
    //creates a new musician
    async createMusician(
        userId: string,
        createMusicianDto: CreateMusicianDto
    ): Promise<Musician> {
        const newMusician = new this.musicianModel({
            _id: new Types.ObjectId(userId),
            ...createMusicianDto,
            profileCompleted: true,
        });
        await this.userModel.updateOne(
        { _id: userId },
        { $set: { profileCompleted: true } }
    );
        return newMusician.save();
    }

    //gets all musicians
    async getMusicians(): Promise<Musician[]> {
        return this.musicianModel.find().exec();
    }

    //gets a musician by id
    async getMusicianById(id: string){
        return this.musicianModel.findById(id).exec();
    }

    //updates the musician
    async updateMusician(id: string, updateMusicianDto: CreateMusicianDto){
        return this.musicianModel.findByIdAndUpdate(id, updateMusicianDto, {new: true}).exec();
    }

    //deletes the musician
    async deleteMusician(id: string){
        return this.musicianModel.findByIdAndDelete(id).exec();
    }
}
