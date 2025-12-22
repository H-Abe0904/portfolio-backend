import {
    Injectable,
    HttpException,
    HttpStatus,
    ForbiddenException,
    Logger,
    Body
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository, DeepPartial } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import * as schema from '../auth/schema';
import { JwtPayload, Token } from '../auth/types';
import { User } from './models/user.entity';
import de from 'zod/v4/locales/de.js';

type CreateUserDto = {
    username: string;
    password: string;
    firstName: string;
    lastName: string;

}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly createUserSchema: CreateUserDto,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) { }

    async createUser(dto: CreateUserDto) {
        // ユーザ作成ロジックをここに実装
        const hashedPassword = await argon2.hash(dto.password);
        dto.password = hashedPassword;
        const newUser = await this.userRepository.create(dto);
        // ユーザをデータベースに保存する処理を追加

        const savedUser = await this.userRepository.save(newUser);
        delete savedUser.password;
        return savedUser;

    }

    async signIn(signInDto: any): Promise<Token> {
        // Sign-in logic not implemented yet
        throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED);
    }
}
