import { IsString, IsOptional } from 'class-validator';

export class UpdateDTO {
	@IsString()
	@IsOptional()
	readonly password?: string;
}