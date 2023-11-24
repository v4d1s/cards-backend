import {Body, Controller, Patch, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDTO} from "./dto";

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

    // TODO valid path?
    @Patch('me')
    updateName() {
        return this.userService.updateName();
    }

    // auth.post("/me", findUserByToken(getMe, "getMe"));
}
