import { MusiciansService } from './musicians.service';
import { CreateMusicianDto } from './dto/CreateMusician.dto';
export declare class MusiciansController {
    private readonly musiciansService;
    constructor(musiciansService: MusiciansService);
    createMusician(createMusicianDto: CreateMusicianDto): Promise<import("./schemas/musician.schema").Musician>;
    getMusicians(): Promise<import("./schemas/musician.schema").Musician[]>;
}
