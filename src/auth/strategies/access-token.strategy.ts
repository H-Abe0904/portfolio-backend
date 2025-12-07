import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * アクセストークン作成用のStrategy
 */
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token') {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}