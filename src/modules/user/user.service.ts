import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./model/user.schema";
import {CreateUserDTO} from "./dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
    ) {}

    async register(dto: CreateUserDTO) {
        // TODO user_register service

        // const newUser = {
        //     email: dto.email,
        //     password: dto.password,
        //     name: dto.email,
        // }
        // await this.userRepository.create(newUser)
    }

    login(dto: CreateUserDTO) {
        // TODO user_login service
    }

    updateName() {
        // TODO user_updateName service
    }
}
