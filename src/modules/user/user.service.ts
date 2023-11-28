import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.schema';
import { CreateUserDTO } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDTO) {
    const existUser = await this.findOneByEmail(dto.email);
    if (existUser) {
      throw new Error('Some user have this email');
    }
    const passwordHashed = await argon2.hash(dto.password);
    const userRecord = await this.userRepository.create({
      password: passwordHashed,
      email: dto.email,
      name: dto.email,
    });
    return userRecord.id;
  }

  async login(dto: CreateUserDTO) {
    const userRecord = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!userRecord) {
      throw new Error('User not found');
    } else {
      if (await argon2.verify(userRecord.password, dto.password)) {
        const payload = { email: dto.email, id: userRecord.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      } else {
        throw new Error('Incorrect password');
      }
    }
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async updateName(name: string, email: string) {
    return await this.userRepository.update(
      { name: name },
      { where: { email: email } },
    );
  }

  async getAllUsersId() {
    return await this.userRepository.findAll({ attributes: ['id'] });
  }
}
