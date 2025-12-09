import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { ZodObject } from "zod";

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodObject<any>) {}

    transform(value: any, metadata: ArgumentMetadata) {
        try {
            const parsedData = this.schema.parse(value);
            return parsedData;
        }catch (error) {
            throw new BadRequestException('Validation failed', error.errors);
        }
    }
}