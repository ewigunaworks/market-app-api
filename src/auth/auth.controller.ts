import { Body, Controller, HttpCode, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './request-with-user.interface';
import { LocalAuthGuard } from './local-auth.guard';
 
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
 
  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }
 
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: RequestWithUser) {
    return this.authService.login(request.user);
  }
}