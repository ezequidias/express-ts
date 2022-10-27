import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from '@interfaces/products.interface';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity implements Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  category_id: number;

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
