import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNumber()
  public parent_id: string;

  @IsString()
  public name: string;

  @IsString()
  public image: string;
}
