import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { JwtPayload, RefreshJwtPayload } from "../types";

/**
 * リフレッシュトークン作成用のStrategy
 */

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        });
    }

    /**
     * バリデーションチェック
     * @param payload ペイロード
     * @returns ユーザー情報
     */
    async validate(req: Request, payload: JwtPayload): Promise<RefreshJwtPayload> {
        const refreshToken = req
            ?.get('authorization')
            ?.replace('Bearer ', '')
            .trim();

        if (!refreshToken) throw new ForbiddenException('Refresh token not found');
        return {
            ...payload,
            refreshToken,
        }
    }
}