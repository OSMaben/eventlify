import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtValidator extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '@kf)$gh><0212',
        });
    }

    async validate(payload: any) {


        return {
            number: payload.number,
            username: payload.username,
            email: payload.email,
            role: payload.role,
        };
    }

}
