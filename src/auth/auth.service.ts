import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import RegisterDto from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword
      });
      const { password, username, ...rest} = createdUser;
      return rest;
    } catch (error) {
      
    }
  }

  public async getAuthenticatedUser(username: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByUsername(username);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    }
  }
   
  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    }
  }  

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      name: user.name
    }
  }
}
