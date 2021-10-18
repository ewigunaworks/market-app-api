import { Controller, UseGuards, Get, Request } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('detail')
  detail(@Request() request): string {
    return request.user
  }
}