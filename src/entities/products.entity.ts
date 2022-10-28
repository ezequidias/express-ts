import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { Product } from '@interfaces/products.interface';
import { CategoryEntity } from './categories.entity';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity implements Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id', nullable: true, default: null })
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

  @JoinColumn({ name: 'category_id' })
  @OneToOne(() => CategoryEntity, {
    nullable: true,
  })
  category?: CategoryEntity;

}
