import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MusiciansService } from './musicians.service';
import { CreateMusicianDto } from './dto/CreateMusician.dto';
import { Body, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('musicians')
export class MusiciansController {
    constructor(
        private readonly musiciansService: MusiciansService, 
        private readonly userService: UsersService,
        private readonly authService: AuthService
    ) {}

    @UseGuards(JwtAuthGuard) // Ensure that the user is authenticated
    @Post('register')
    async createMusician(
        @Body() createMusicianDto: CreateMusicianDto,
        @Req() req,  
    ) {
        const userId = req.user._id; 
        //saves the user to the database
        await this.musiciansService.createMusician(userId, createMusicianDto);

        const updatedUser = await this.userService.getUserById(userId);

        if (!updatedUser) {
            throw new Error('User not found');
        }

        const newToken = this.authService.generateJwt(updatedUser);
        
        return{
            message: 'Musician registered successfully',
            musician: updatedUser,
            user: updatedUser,
            token: newToken,
        }
    }

    @Get()
    getMusicians() {
        return this.musiciansService.getMusicians();
    } 
}
