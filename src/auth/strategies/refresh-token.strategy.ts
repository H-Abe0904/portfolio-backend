import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        });
    }

    async validate(req: Request, payload: JwtPayload): RefreshJwtPayload {
        const refresToken = req
            ?.get('authorization')
            ?.replace('Bearer ', '')
            .trim();

        if (!refresToken) throw new ForbiddenException('Refresh token not found');

        return {
            ...payload,
            refreshToken: refresToken,
        }
    }
}