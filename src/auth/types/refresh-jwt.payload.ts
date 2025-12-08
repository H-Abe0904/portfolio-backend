import { JwtPayload } from "./jwt.payload";

export type RefreshJwtPayload = JwtPayload & {
    refreshTokenId: string;
};