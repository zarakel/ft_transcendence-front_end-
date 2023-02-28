import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor()
    {
        super({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: '_My_Secret_Key_'
    })
    }

    async validate(payload: any)
    {
        return { username: payload.username };
    }

}