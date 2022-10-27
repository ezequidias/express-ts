import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  public category_id: number;

  @IsString()
  public name: string;

  @IsString()
  public image: string;
}
