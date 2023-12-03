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
          id: userRecord.id,
          email: userRecord.email,
          name: userRecord.name,
          cardsCount: userRecord.cardsCount,
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

  async updateCardCount(isPlus: boolean, userId: number, count: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new Error('User not found');
    let newCount = user.cardsCount;
    if (isPlus) newCount += count;
    else newCount -= count;
    if (newCount < 0) throw new Error('What? Your card count < 0... :0');
    return await this.userRepository.update(
      { cardsCount: newCount },
      { where: { id: userId } },
    );
  }
}
