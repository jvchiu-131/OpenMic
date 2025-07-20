import { Body, Controller, Post, Get, Param, HttpException, Patch, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    //creates a new user
    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto) {
        //saves the user to the database
        return this.usersService.createUser(createUserDto);
    }

    //gets all users
    @Get()
    getUsers() {
    return this.usersService.getUsers();
    }

    //gets a user by id
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);

        if (!isValid) {
            throw new HttpException('Users not found', 404);
        }
        const findUser = await this.usersService.getUserById(id);
        if (!findUser) {
            throw new HttpException('User not found', 404);
        }return findUser;
    }

    //updates the user
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id);

        if (!isValid) {
            throw new HttpException('Users not found', 404);
        }
        const updateUser = await this.usersService.updateUser(id, updateUserDto);
        if (!updateUser) {
            throw new HttpException('User not found', 404);
        }return updateUser;
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe())
    async deleteUser(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);

        if (!isValid) {
            throw new HttpException('Users not found', 404);
        }
        const deleteUser = await this.usersService.deleteUser(id);
        if (!deleteUser) {
            throw new HttpException('User not found', 404);
        }return deleteUser;
    }

}
