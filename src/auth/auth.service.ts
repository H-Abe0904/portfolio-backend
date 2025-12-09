import { 
    Injectable,
    HttpException,
    HttpStatus,
    ForbiddenException,
    Logger
 } from '@nestjs/common';
 import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import {JwtService} from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import  { createUserSchema } from '../auth/schema';
import  {JwtPayload, Token } from '../auth/types';
import { ZodAny } from 'zod';



@Injectable()
export class AuthService {
    async createUser(createUserDto: any): Promise<void> {
        // ユーザ作成ロジックをここに実装
        const schema = createUserDto.object(createUserSchema);
        const validatedData = schema.parse(createUserDto);
        const { username, password, firstName, lastName } = validatedData;
        const hashedPassword = await argon2.hash(password);
        // ユーザをデータベースに保存する処理を追加
        const user = this.userRepository.create({
            username,
            password: hashedPassword,
            firstName,
            lastName,
        });
        await this.userRepository.save(user);
    }
}
