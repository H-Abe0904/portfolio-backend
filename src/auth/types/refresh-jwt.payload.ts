import { JwtPayload } from "./jwt.payload";

export type RefreshJwtPayload = JwtPayload & {
    refreshToken: string;
};