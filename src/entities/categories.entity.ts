import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from '@interfaces/categories.interface';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity implements Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  parent_id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  image: string;

  @Column()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
