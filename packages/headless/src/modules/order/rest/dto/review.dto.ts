import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { IComment, IReview, IReviewPhoto, ReviewErrorMessage, ReviewErrorResponse, ReviewSuccessResponse } from 'models';
import { Commenters } from 'src/entity/review';

export class ReviewPhotoDto implements IReviewPhoto{
    @ApiProperty()
    @IsNotEmpty()
    url: string;
}

export class CommentDto implements IComment{
    @ApiProperty({ enum: Commenters})
    commentedBy: Commenters;

    @ApiProperty()
    @IsNotEmpty()
    text: string;

    @ApiProperty()
    @IsNotEmpty()
    createdAt: Date;
}

export class ReviewDto implements IReview{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty()
    @IsString()
    orderId: string;

    @ApiProperty()
    @IsString()
    text: string;

    @ApiProperty({ type: [ReviewPhotoDto]})
    // @IsOptional()
    @Type(() => ReviewPhotoDto)
    image: ReviewPhotoDto[];

    @ApiProperty()
    @IsString()
    @IsOptional()
    userId?: string;

    @ApiProperty({ type: CommentDto})
    @IsNotEmpty()
    @IsObject()
    reply: CommentDto;

    @ApiProperty()
    @IsNumber()
    rating: number;
}

export class ReviewSuccessResponseDto implements ReviewSuccessResponse{
    @ApiProperty({ default: HttpStatus.OK })
    code: number;

    @ApiProperty()
    data: ReviewDto;
}

export class ReviewErrorResponseDto implements ReviewErrorResponse {
  @ApiProperty({ default: HttpStatus.BAD_REQUEST })
  code?: number;

  @ApiProperty()
  error:
    | ReviewErrorMessage.CANNOT_FIND_REVIEW
    | ReviewErrorMessage.INVALID_PRODUCT_ID
    | ReviewErrorMessage.INVALID_ORDER_ID
    | ReviewErrorMessage.INVALID_USER_ID

  @ApiProperty()
  errors: string[];
}

export type ReviewResponseDto =
  | ReviewErrorResponseDto
  | ReviewSuccessResponseDto;