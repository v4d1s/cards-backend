import {Body, Controller, Patch, Post, UseGuards, Request, Get} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDTO} from "./dto";
import { AuthGuard } from './auth.guard';
import {GradeService} from "../grade/grade.service";
import {CardService} from "../card/card.service";

@Controller('auth')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly gradeService: GradeService,
        private readonly cardService: CardService,
    ) {}

    @Post('login')
    login(@Body() dto: CreateUserDTO) {
        return this.userService.login(dto);
    }
    @Post('register')
    async register(@Body() dto: CreateUserDTO) {
        const userId = await this.userService.register(dto);
        const cardList = await this.cardService.getAllCardsId()
        await this.gradeService.createGradesForNewUser(cardList, userId);
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
