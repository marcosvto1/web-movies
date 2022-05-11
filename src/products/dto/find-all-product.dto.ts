import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllProductDTO {
  @IsOptional()
  @IsNumber()
  is_featured?: string;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsNumber()
  category_id?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
