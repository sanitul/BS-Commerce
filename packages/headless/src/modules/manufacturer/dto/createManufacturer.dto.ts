import { CreateManufacturerRequest, CreateManufacturerErrorResponse, CreateManufacturerSuccessResponse } from './../../../../../models/src/manufacturer/createManufacturer';
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { ManufacturerDto } from './manufacturer.dto';
import { ManufacturerSeoDto } from './manufacturerSeo.dto';

export class CreateManufacturerDto implements CreateManufacturerRequest {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    picture?: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isPublished?: boolean;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    displayOrder?: number;

    @ApiProperty()
    @IsOptional()
    @ValidateNested({ each: true })
    @IsObject()
    seo?: ManufacturerSeoDto
}

export class CreateManufacturerErrorResponseDto implements CreateManufacturerErrorResponse {
    @ApiProperty()
    code: number;

    @ApiProperty()
    error: 'CANT\'T_CREATE_MANUFACTURER';

    @ApiProperty()
    errors: string[];
}

export class CreateManufacturerSuccessResponseDto implements CreateManufacturerSuccessResponse {
    @ApiProperty()
    code: number;

    @ApiProperty()
    data: ManufacturerDto;
}