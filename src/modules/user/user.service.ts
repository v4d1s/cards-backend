import * as jwt from 'jsonwebtoken'
import * as argon2 from 'argon2';

import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./model/user.schema";
import { CreateUserDTO } from "./dto";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: CreateUserDTO) {
        const passwordHashed = await argon2.hash(dto.password);

        const userRecord = await this.userRepository.create({
            password: passwordHashed,
            email: dto.email,
        });
        return {
            user: {
                email: userRecord.email,
            }
        }
    }

    async login(dto: CreateUserDTO) {
        const userRecord = await this.userRepository.findOne({ where: { email: dto.email } });
        if (!userRecord) {
            throw new Error('User not found')
        } else {
            if (await argon2.verify(userRecord.password, dto.password)) {
                const payload = { email: dto.email };
                return {
                    access_token: this.jwtService.sign(payload),
                }
            }
            else {
                throw new Error('Incorrect password')
            }
        }
    }

    async findOneByEmail(email) {
        return await this.userRepository.findOne({ where: { email: email } });
    }

    updateName() {

    }
}
