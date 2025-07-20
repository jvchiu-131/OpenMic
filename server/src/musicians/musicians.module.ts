import { Module } from '@nestjs/common';
import { MusiciansService } from './musicians.service';
import { MusiciansController } from './musicians.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Musician, MusicianSchema } from './schemas/musician.schema'; 
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Musician.name, 
        schema: MusicianSchema 
      }
    ]),
    UsersModule
  ],
  controllers: [MusiciansController],
  providers: [MusiciansService],
  exports: [MusiciansService]
})
export class MusiciansModule {}
// This module imports the MongooseModule with the Musician schema, registers the MusiciansController and MusiciansService, and exports the MusiciansService for use in other modules.
// It allows for the creation, retrieval, updating, and deletion of musician records in the database.
// The MusiciansService provides methods to interact with the Musician model, while the MusiciansController handles incoming requests related to musicians.