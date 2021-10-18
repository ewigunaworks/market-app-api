import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET'
    })
  }

  async validate(payload: any) {
    // const user = await this.userService.getById(payload.sub)
    return {
      id: payload.sub,
      name: payload.name
    }
  }
}