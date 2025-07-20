import { Controller, Get } from '@nestjs/common';
import { MusiciansService } from './musicians.service';
import { CreateMusicianDto } from './dto/CreateMusician.dto';
import { Body, Post } from '@nestjs/common';


@Controller('musicians')
export class MusiciansController {
    constructor(private readonly musiciansService: MusiciansService) {}

    @Post('register')
    createMusician(@Body() createMusicianDto: CreateMusicianDto) {
        //saves the user to the database
        return this.musiciansService.createMusician(createMusicianDto);
    }

    @Get()
    getMusicians() {
        return this.musiciansService.getMusicians();
    } 
}
