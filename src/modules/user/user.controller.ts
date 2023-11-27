import {Body, Controller, Patch, Post, UseGuards, Request, Get} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDTO} from "./dto";
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('login')
    login(@Body() dto: CreateUserDTO) {
        return this.userService.login(dto);
    }
    @Post('register')
    register(@Body() dto: CreateUserDTO) {
        return this.userService.register(dto);
    }

    @UseGuards(AuthGuard)
    @Patch('profile')
    updateName(@Request() req: any, @Body('newName') name: string) {
        return this.userService.updateName(name, req.user.email);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: any) {
        return this.userService.findOneByEmail(req.user.email);
    }
}
