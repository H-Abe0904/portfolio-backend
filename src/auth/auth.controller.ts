import { 
    Controller,
    Body,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Query,
    UseGuards,
    HttpCode,
    HttpStatus,
    PipeTransform,
    ArgumentMetadata,
    BadRequestException
 } from '@nestjs/common';
 import { ZodObject } from 'zod';
 import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
 import { ConfigService } from '@nestjs/config';
 import { AuthService } from './auth.service';
 import { RefreshTokenGuard } from './guards';
 import { CreateUserSchema,signInUserSchema  } from './schema';
 import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) {}

    @ApiTags('Auth')
    @ApiOperation({ summary: 'user register' })
    @Post('signup')
    @HttpCode(HttpStatus.ACCEPTED)
    async signUp(
        @Body(new ZodValidationPipe(CreateUserSchema)) createUserDto: ZodObject<any>
    ) {
        return this.authService.signUp(createUserDto);
    }

}
