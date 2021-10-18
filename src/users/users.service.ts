import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Users from './users.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/CreateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async getByUsername(username: string) {
    const user = await this.usersRepository.findOne({username});
    if(user) {
      return user;
    }
    throw new HttpException('User not exist', HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({id});
    if(user) {
      return user;
    }
    throw new HttpException('User not exist', HttpStatus.NOT_FOUND);
  }
}
